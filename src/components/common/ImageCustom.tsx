"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "../ui";

interface Props {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export const ImageCustom = ({ alt, src, width, height }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const classname = `w-[${width}px] h-[${height}px] rounded-full`

  return (
    <div className="relative">
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className={`${!loaded ? "opacity-0" : "opacity-100"}}`}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && <Skeleton className={classname} />}
    </div>
  );
};
