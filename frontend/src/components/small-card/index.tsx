import { ComponentPropsWithoutRef } from "react";

import addUserWhite from "../../assets/icons/add-user-white.svg";
import analyzeWhite from "../../assets/icons/analyze-white.svg";
import documentWhite from "../../assets/icons/document-white.svg";
import graphReportWhite from "../../assets/icons/graph-report-white.svg";
import peopleWhite from "../../assets/icons/people-white.svg";
import profileWhite from "../../assets/icons/profile-white.svg";

import addUserBlue from "../../assets/icons/add-user-blue.svg";
import analyzeBlue from "../../assets/icons/analyze-blue.svg";
import documentBlue from "../../assets/icons/document-blue.svg";
import graphReportBlue from "../../assets/icons/graph-report-blue.svg";
import peopleBlue from "../../assets/icons/people-blue.svg";
import profileBlue from "../../assets/icons/profile-blue.svg";
import { useNavigate } from "react-router-dom";

type SmallCardIconType =
  | "add-user"
  | "analyze"
  | "document"
  | "graph-report"
  | "people"
  | "profile";

const whiteIcons: Record<SmallCardIconType, string> = {
  "add-user": addUserWhite,
  analyze: analyzeWhite,
  document: documentWhite,
  "graph-report": graphReportWhite,
  people: peopleWhite,
  profile: profileWhite,
};

const blueIcons: Record<SmallCardIconType, string> = {
  "add-user": addUserBlue,
  analyze: analyzeBlue,
  document: documentBlue,
  "graph-report": graphReportBlue,
  people: peopleBlue,
  profile: profileBlue,
};

interface SmallCardProps extends ComponentPropsWithoutRef<"button"> {
  text: string;
  icon?: SmallCardIconType;
  variant?: "white" | "blue";
  linkTo?: string
}

export default function SmallCard({
  text,
  icon,
  variant = "white",
  linkTo,
  ...props
}: SmallCardProps) {
  const navigate = useNavigate();

  const bgClasses = {
    blue: "bg-[#322A6A] hover:bg-[#251c61] text-white",
    white: "bg-[#fff] hover:bg-[#332a6a26] text-[#322A6A]",
  }[variant];

  const isWhiteVariant = variant === "white";
  const iconSrc = icon ? isWhiteVariant ? blueIcons[icon] : whiteIcons[icon] : '';

  const handleOnClick = () => {
    if (linkTo && linkTo != '') {
      navigate(linkTo)
    }
  }

  return (
    <button
      onClick={() => handleOnClick()}
      className={`${bgClasses} w-full max-w-70 px-4 py-6 lg:px-8 lg:py-10 rounded-2xl flex items-center gap-3 text-left transition-colors cursor-pointer shadow-md relative`}
      {...props}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt={`${icon} icon`}
          className="w-12 h-12 lg:w-16 lg:h-16 select-none pointer-events-none"
        />
      )}

      <span className=" text-sm lg:text-lg font-bold leading-tight">{text}</span>
    </button>
  );
}
