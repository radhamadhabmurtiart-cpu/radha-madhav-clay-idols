import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Customer authentication hook using Internet Identity.
 * Separate from admin auth — customer login does NOT grant admin access.
 * After login, fetches the visitor's registered name from the backend.
 */
export function useCustomerAuth() {
  const { identity, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();

  const { actor, isFetching } = useActor(createActor);

  const isAuthenticated = !!identity;

  // The visitor's actual registered name from the backend
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  // Whether profile has been checked (to avoid repeatedly showing form)
  const [profileChecked, setProfileChecked] = useState(false);

  // Track the last identity we fetched for, to avoid redundant calls
  const lastFetchedPrincipal = useRef<string | null>(null);

  const fetchVisitorProfile = useCallback(async () => {
    if (!actor || !isAuthenticated || isFetching) return;
    // Avoid duplicate fetches for the same principal
    const principalText = identity?.getPrincipal().toText() ?? null;
    if (!principalText) return;
    if (lastFetchedPrincipal.current === principalText && profileChecked)
      return;

    setIsLoadingProfile(true);
    try {
      const result = await actor.getMyProfile();
      if (result.__kind__ === "ok") {
        // Always show actual name from profile, never fall back to principal
        setVisitorName(result.ok.name || null);
      } else {
        setVisitorName(null);
      }
      lastFetchedPrincipal.current = principalText;
    } catch {
      setVisitorName(null);
    } finally {
      setIsLoadingProfile(false);
      setProfileChecked(true);
    }
  }, [actor, isAuthenticated, isFetching, identity, profileChecked]);

  // Fetch visitor profile whenever identity or actor becomes ready
  useEffect(() => {
    if (!isAuthenticated) {
      setVisitorName(null);
      setProfileChecked(false);
      lastFetchedPrincipal.current = null;
      return;
    }
    if (isInitializing || isFetching || !actor) return;
    fetchVisitorProfile();
  }, [isAuthenticated, isInitializing, isFetching, actor, fetchVisitorProfile]);

  // Register a visitor and immediately update the displayed name
  const registerVisitorProfile = useCallback(
    async (name: string, phone: string): Promise<boolean> => {
      if (!actor) return false;
      try {
        const result = await actor.registerVisitor(name, phone);
        if (result.__kind__ === "ok") {
          // Store the name the user entered — this is their actual name
          setVisitorName(result.ok.name);
          setProfileChecked(true);
          // Update tracked principal so we don't re-fetch and overwrite
          const principalText = identity?.getPrincipal().toText() ?? null;
          lastFetchedPrincipal.current = principalText;
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [actor, identity],
  );

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isLoadingProfile,
    profileChecked,
    visitorName,
    registerVisitorProfile,
    login,
    logout: clear,
  };
}
