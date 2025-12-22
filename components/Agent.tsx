import React, { useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

enum CallState {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
  const callStatus = CallState.ACTIVE;
  const isSpeaking = true;
  const message = [
    "Whats you name?",
    "My name is Jhon Doe, nice to meet you!",
    "I am a software engineer with 5 years of experience in web development.",
  ];

  return (
    <div className="relative flex flex-col  h-[85vh] justify-center items-center">
      <div className="flex flex-row  gap-6">
        <Card className="flex flex-col justify-center items-center gap-2 w-[350px] h-[350px]">
          <div className=" gap-2">
            <div className="relative p-8 bg-white rounded-full">
              <Image
                src="/ai-avatar.png"
                alt="avatar"
                width={65}
                height={50}
                className="relative z-10"
              />
              {isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full bg-primary animate-ping opacity-25" />
                  <div className="absolute w-full h-full rounded-full bg-primary animate-pulse opacity-15 scale-110" />
                </div>
              )}
            </div>
          </div>
          <div className="py-4 mt-6 flex flex-col justify-center items-center gap-2">
            <h3 className=" text-center text-user-primary font-semibold text-2xl">
              AI Interviewer
            </h3>
          </div>
        </Card>

        <Card className="flex max-sm:hidden flex-col justify-center items-center gap-2 w-[350px] h-[350px]">
          <div className=" gap-2">
            <div className="relative bg-white rounded-full border-4 border-gray-500">
              <Image
                src="/user-avatar.png"
                alt="user-avatar"
                width={65}
                height={50}
                className="relative z-10 w-[120px] h-[120px] object-cover rounded-full"
              />
              {!isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full bg-primary animate-ping opacity-25" />
                  <div className="absolute w-full h-full rounded-full bg-primary animate-pulse opacity-15 scale-110" />
                </div>
              )}
            </div>
          </div>
          <div className="py-4 mt-6 flex flex-col justify-center items-center gap-2">
            <h3 className=" text-center text-user-primary font-semibold text-2xl">
              {userName || "you"}
            </h3>
          </div>
        </Card>
      </div>
      {message.length > 0 && (
        <div className="flex flex-col justify-center items-center gap-2 py-6 px-10">
          <div className="flex flex-col justify-center items-center gap-2 px-6 py-4 bg-black/20 border border-gray-200/50 rounded-md">
            <p
              key={message[message.length - 1]}
              className={cn(
                "transition-opacity duration-500  opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {message[message.length - 1]}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col justify-center items-center gap-2 ">
        {callStatus !== "ACTIVE" ? (
          <Button className="relative ">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </Button>
        ) : (
          <Button className="">End</Button>
        )}
      </div>
    </div>
  );
};

export default Agent;
