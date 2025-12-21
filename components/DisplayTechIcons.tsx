import { getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const DisplayTechIcons = async ({ techStack }: { techStack: string[] }) => {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className="flex items-center gap-2">
      {/* {techIcons.map((tech) => (
        <Image
          key={tech}
          src={`/tech/${tech}.svg`}
          alt={tech}
          width={20}
          height={20}
        />
      ))} */}
      {techIcons.slice(0, 3).map(({ tech, url }) => (
        <div
          key={tech}
          className={`relative group bg-dark-300 rounded-full flex-center `}
        >
          <Button variant="outline" className="p-2 rounded-full">
            <Image src={url} alt={tech} width={20} height={20} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
