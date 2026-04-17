import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useEffect, useState } from "react";

/**
 * Admin authentication hook using Internet Identity.
 * After identity is confirmed, calls isAdminCaller() on the backend to verify
 * that the logged-in principal is the site owner. Only the owner can access admin.
 */
export function useAdmin() {
  const {
    identity,
    login,
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

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    // Reset when identity disappears (logout)
    if (!isAuthenticated) {
      setIsAdmin(false);
      setIsAdminLoading(false);
      return;
    }

    // Wait for identity to fully initialize and actor to be ready
    if (isInitializing || isActorFetching || !actor) {
      setIsAdminLoading(true);
      return;
    }

    let cancelled = false;
    setIsAdminLoading(true);

    async function checkAdmin() {
      try {
        // isAdminCaller() is available on the backend but may not be in generated typings.
        // We cast actor to access it safely.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actorAny = actor as any;
        if (typeof actorAny.isAdminCaller === "function") {
          const result: boolean = await actorAny.isAdminCaller();
          if (!cancelled) setIsAdmin(result);
        } else {
          // If method doesn't exist in current bindings, fall back to false (safe)
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

  return {
    identity,
    isAuthenticated,
    isLoading,
    isAdmin,
    isAdminLoading,
    isInitializing,
    isLoggingIn,
    isLoginError,
    loginError,
    loginStatus,
    login,
    logout: clear,
  };
}
