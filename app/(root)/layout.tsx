import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
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
