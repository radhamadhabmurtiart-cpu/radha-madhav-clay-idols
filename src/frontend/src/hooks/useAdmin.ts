import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "adminSessionToken";

/**
 * Admin authentication hook using phone + password.
 * Token is stored in localStorage under SESSION_KEY.
 * On mount, the token is validated against the backend.
 */
export function useAdmin() {
  const { actor, isFetching: isActorFetching } = useActor(createActor);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Validate stored session token on mount / when actor becomes ready
  useEffect(() => {
    if (isActorFetching || !actor) {
      setIsAdminLoading(true);
      return;
    }

    const token = localStorage.getItem(SESSION_KEY);
    if (!token) {
      setIsAdmin(false);
      setIsAdminLoading(false);
      return;
    }

    let cancelled = false;
    setIsAdminLoading(true);

    async function validate() {
      try {
        const valid = await (
          actor as ReturnType<typeof createActor>
        ).validateAdminSession(token!);
        if (!cancelled) setIsAdmin(valid);
        if (!cancelled && !valid) localStorage.removeItem(SESSION_KEY);
      } catch {
        if (!cancelled) setIsAdmin(false);
        if (!cancelled) localStorage.removeItem(SESSION_KEY);
      } finally {
        if (!cancelled) setIsAdminLoading(false);
      }
    }

    validate();
    return () => {
      cancelled = true;
    };
  }, [isActorFetching, actor]);

  /**
   * Login with phone + password.
   * On success stores the session token in localStorage and sets isAdmin=true.
   */
  const login = useCallback(
    async (phone: string, password: string): Promise<boolean> => {
      if (!actor) {
        setLoginError("Service not ready. Please try again.");
        return false;
      }
      setIsLoggingIn(true);
      setLoginError(null);
      try {
        const result = await (
          actor as ReturnType<typeof createActor>
        ).adminLogin(phone, password);
        if (result.__kind__ === "ok") {
          localStorage.setItem(SESSION_KEY, result.ok);
          setIsAdmin(true);
          return true;
        }
        setLoginError(result.err ?? "Invalid phone number or password.");
        return false;
      } catch (err) {
        setLoginError(
          err instanceof Error
            ? err.message
            : "Login failed. Please try again.",
        );
        return false;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [actor],
  );

  /** Logout — clears server session + localStorage */
  const logout = useCallback(async () => {
    const token = localStorage.getItem(SESSION_KEY);
    if (token && actor) {
      try {
        await (actor as ReturnType<typeof createActor>).adminLogout(token);
      } catch {
        // ignore — we clear locally regardless
      }
    }
    localStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, [actor]);

  /** Convenience: read stored token (for passing to mutations) */
  const getSessionToken = useCallback((): string | null => {
    return localStorage.getItem(SESSION_KEY);
  }, []);

  return {
    isAdmin,
    isAdminLoading,
    isActorReady: !isActorFetching && !!actor,
    isLoggingIn,
    loginError,
    login,
    logout,
    getSessionToken,
  };
}
