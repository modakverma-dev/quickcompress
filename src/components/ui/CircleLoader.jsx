import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

const CircleLoader = ({ className }) => {
  return <LoaderCircle className={cn("animate-spin", className)} />;
};

export default CircleLoader;
