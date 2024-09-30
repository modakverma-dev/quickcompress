import React from "react";
import { cn } from "@/lib/utils";

const CustomRichText = ({ richText, className }) => {
  return (
    <div
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: richText }}
    />
  );
};

export default CustomRichText;
