import Image from "next/image";
import Link from "next/link";
import React from "react";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const isAuthenticatedUser = await isAuthenticated();
  if (!isAuthenticatedUser) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <nav className="flex items-center justify-between px-12 py-6">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default layout;
