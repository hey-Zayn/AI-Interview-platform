import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { dummyInterviews } from "@/constants";
import InterViewCard from "@/components/InterViewCard";
const page = () => {
  return (
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center  px-6 py-24 overflow-hidden">
        <div className="container max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 text-center lg:text-left items-center lg:items-start">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              Get Interview-Ready with <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-white to-blue-900 bg-clip-text text-transparent">
                AI-Powered
              </span>
              Practice & Feedback
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
              Master your next interview with real-time practice sessions and
              instant, actionable feedback powered by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="w-full sm:w-fit px-12 text-base font-bold transition-all hover:scale-[1.03] active:scale-95 shadow-lg cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 max-sm:top-0 max-sm:left-0 max-sm:w-full max-sm:h-full bg-blue-600/10 blur-[120px] rounded-full" />
            <Image
              src="/robot.png"
              alt="AI Interview Assistant"
              width={500}
              height={500}
              className="relative z-10 max-sm:block drop-shadow-2xl transition-transform duration-700 hover:translate-y-[-10px]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 w-full h-screen px-6 py-24">
        <h2 className="text-5xl max-sm:text-4xl max-sm:text-center font-bold mb-4">
          Your Interviews
        </h2>
        <div className="flex flex-wrap gap-4">
          {dummyInterviews.map((interview) => (
            <InterViewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      <section>
        <h2>Interview History</h2>
        <div className="interview-history">
          <p>You havent created any interviews yet.</p>
        </div>
      </section>
    </>
  );
};

export default page;
