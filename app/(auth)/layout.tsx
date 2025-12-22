import { redirect } from "next/navigation";
import React from "react";
import { checkAuthStatus } from "@/lib/actions/auth.action";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const isAuthenticatedUser = await checkAuthStatus();
  if (isAuthenticatedUser) {
    return redirect("/");
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
