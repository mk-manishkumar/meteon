import clsx from "clsx";
import Sun from "../assets/sun.svg?react";
import Cloud from "../assets/cloud.svg?react";

type Props = Readonly<{
  code: number;
  className?: string;
}>;

export default function WeatherIcon({ code, className }: Props) {
  if (code === 0) {
    return <Sun className={clsx("size-8", className)} />;
  }

  return <Cloud className={clsx("size-8", className)} />;
}
