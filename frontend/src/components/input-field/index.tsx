import { useState, ComponentPropsWithoutRef } from "react";

import userIcon from "../../assets/icons/user.svg";
import lockIcon from "../../assets/icons/lock.svg";
import mailIcon from "../../assets/icons/mail.svg";
import fileIcon from "../../assets/icons/file.svg";
import { Eye, EyeOff } from "lucide-react";

type IconType = "user" | "lock" | "mail" | "file";

const iconMap: Record<IconType, string> = {
  user: userIcon,
  lock: lockIcon,
  mail: mailIcon,
  file: fileIcon,
};

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  type?: "text" | "password" | "email" | "number";
  icon?: IconType;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  icon,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const iconSrc = icon ? iconMap[icon] : null;

  const isPassword = type === "password";
  const currentType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-md mb-2 text-left">
      {/* Label */}
      {label && <label className="text-sm text-black">{label}</label>}

      {/* Container do Input */}
      <div className="relative flex items-center w-full bg-white border border-gray-200 rounded-lg shadow-sm focus-within:border-[#322A6A] focus-within:ring-1 focus-within:ring-[#322A6A] transition-all">
        {iconSrc && (
          <div className="absolute left-3 pointer-events-none select-none">
            <img src={iconSrc} alt={`${icon} icon`} className="w-5 h-5" />
          </div>
        )}
        <input
          type={currentType}
          placeholder={placeholder}
          className={`w-full py-3 bg-transparent text-[#322A6A] font-semibold placeholder-gray-300 outline-none text-base
            ${iconSrc ? "pl-11" : "pl-4"} 
            ${isPassword ? "pr-11" : "pr-4"}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
