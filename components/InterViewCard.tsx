import React from "react";
import dayjs from "dayjs";
import { InterviewCardProps } from "@/types";
import { Card, CardHeader, CardContent } from "./ui/card";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterViewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mix" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("DD/MM/YYYY");

  return (
    <Card className=" w-[360px] max-sm:w-full p-1">
      <div className="w-full bg-accent rounded-lg pt-2 pb-4 bg-gradient-to-br from-black/80 to-accent">
        <CardHeader className="w-full  ">
          <div className="flex items-center justify-between py-2">
            <Image
              src={getRandomInterviewCover()}
              alt="Interview"
              width={75}
              height={75}
              className="w-16 h-16"
            />
          </div>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <h2 className="text-xl font-bold text-left">{role}</h2>
          <Badge variant="default" className="absolute top-2 right-2">
            {normalizedType}
          </Badge>
          <div className="flex gap-6 py-1">
            <div className="flex items-center gap-2">
              <Image src="/star.svg" alt="star" width={20} height={20} />
              <p className="text-sm font-semibold text-white/60">
                {feedback?.totalScore || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/calendar.svg" alt="date" width={20} height={20} />
              <p className="text-sm text-white/60">{formattedDate || "N/A"}</p>
            </div>
          </div>
          <div className="flex flex-col items-left gap-1 ">
            <p className="text-left text-xs font-semibold text-white/60 mb-1 mt-1">
              {techstack.join(", ")}
            </p>

            <p>
              Have you taken the Interview yet. Take it now to improve your
              skills.
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <DisplayTechIcons techStack={techstack} />
            <Link href={`/interview/${interviewId}`}>
              <Button variant="outline">Interview</Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default InterViewCard;
