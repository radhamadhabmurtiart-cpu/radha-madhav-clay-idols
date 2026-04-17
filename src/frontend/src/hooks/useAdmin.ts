import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { AuthClient } from "@dfinity/auth-client";
import { useEffect, useRef, useState } from "react";

// Internet Identity URL — same URL used by @caffeineai/core-infrastructure internally
const II_URL = "https://identity.ic0.app";

/**
 * Admin authentication hook using Internet Identity.
 *
 * Key fix for Netlify/mobile production:
 *   We create our OWN AuthClient instance in a useEffect on mount and store it
 *   in a ref. The login button stays disabled until this instance is ready.
 *   On click, we call authClientRef.current.login() directly — this guarantees
 *   the AuthClient is always initialized before login() is invoked, regardless
 *   of any timing differences in @caffeineai/core-infrastructure on production builds.
 */
export function useAdmin() {
  const {
    identity,
    login: iiLogin,
    clear,
    loginStatus,
    isInitializing,
    isLoggingIn,
    isLoginError,
    loginError,
  } = useInternetIdentity();

  const { actor, isFetching: isActorFetching } = useActor(createActor);

  const isAuthenticated = !!identity;
  const isLoading = isInitializing || isLoggingIn;

  // Our own AuthClient instance created eagerly on mount
  const authClientRef = useRef<AuthClient | null>(null);
  const [authClientReady, setAuthClientReady] = useState(false);

  // Create AuthClient on mount — this is the critical fix.
  // AuthClient.create() must be called outside any click handler so the
  // instance is fully ready before the user ever touches the button.
  useEffect(() => {
    let cancelled = false;

    async function initAuthClient() {
      try {
        const client = await AuthClient.create();
        if (!cancelled) {
          authClientRef.current = client;
          setAuthClientReady(true);
        }
      } catch {
        // If creation fails we fall back to the iiLogin wrapper below
        if (!cancelled) {
          setAuthClientReady(true); // unblock the button; login attempt will surface the real error
        }
      }
    }

    initAuthClient();

    return () => {
      cancelled = true;
    };
  }, []);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAdmin(false);
      setIsAdminLoading(false);
      return;
    }

    if (isInitializing || isActorFetching || !actor) {
      setIsAdminLoading(true);
      return;
    }

    let cancelled = false;
    setIsAdminLoading(true);

    async function checkAdmin() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actorAny = actor as any;
        if (typeof actorAny.isAdminCaller === "function") {
          const result: boolean = await actorAny.isAdminCaller();
          if (!cancelled) setIsAdmin(result);
        } else {
          if (!cancelled) setIsAdmin(false);
        }
      } catch {
        if (!cancelled) setIsAdmin(false);
      } finally {
        if (!cancelled) setIsAdminLoading(false);
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isInitializing, isActorFetching, actor]);

  /**
   * safeLogin — uses our eagerly-created AuthClient when available.
   *
   * Flow:
   *  1. If our AuthClient ref is ready → call authClient.login() directly.
   *     This is the production-safe path that avoids the "not initialized yet" error.
   *  2. Fallback → delegate to useInternetIdentity's login() wrapper.
   *
   * The login button is disabled until both authClientReady AND !isInitializing,
   * so this function should never be called in an unready state — but we guard
   * defensively anyway.
   */
  function safeLogin() {
    if (!authClientReady || isInitializing) {
      // Not ready yet — button should already be disabled, but guard anyway
      return;
    }

    if (authClientRef.current) {
      // Use our own AuthClient instance directly — guaranteed to be initialized
      authClientRef.current.login({
        identityProvider: II_URL,
        onSuccess: () => {
          // Reload the page so @caffeineai/core-infrastructure picks up the
          // new session from the same AuthClient storage
          window.location.reload();
        },
        onError: (err?: string) => {
          // Surface the error through the existing error state by falling back
          // to the iiLogin path — it will re-attempt and capture the error
          console.error("AuthClient login error:", err);
          iiLogin();
        },
      });
    } else {
      // Fallback: delegate to the hook's own login
      iiLogin();
    }
  }

  // The button should be disabled while either our AuthClient is creating
  // OR the @caffeineai/core-infrastructure is still initializing
  const isButtonDisabled = !authClientReady || isInitializing || isLoggingIn;

  return {
    identity,
    isAuthenticated,
    isLoading,
    isAdmin,
    isAdminLoading,
    isInitializing: isButtonDisabled, // reuse the same flag name so AdminLoginPage needs no changes
    isLoggingIn,
    isLoginError,
    loginError,
    loginStatus,
    login: safeLogin,
    logout: clear,
  };
}
