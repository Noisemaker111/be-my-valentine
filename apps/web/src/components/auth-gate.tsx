import { authClient } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@be-my-valentines/backend/convex/_generated/api";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";
import { useState } from "react";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [showSignUp, setShowSignUp] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = useQuery(api.auth.getCurrentUser);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Be My Valentine <span className="text-[#e31b23]">❤</span>
            </h1>
            <p className="text-muted-foreground">Sign in to see your special surprise</p>
          </div>
          
          {showSignUp ? (
            <SignUpForm onSwitchToSignIn={() => setShowSignUp(false)} />
          ) : (
            <SignInForm onSwitchToSignUp={() => setShowSignUp(true)} />
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
