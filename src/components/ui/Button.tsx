import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FC } from "react";
import Spinner from "./Spinner";

//Utility Function: Merger=] tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ButtonMode = "solid | outline";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  //custom properties goes here
  disabled?: boolean;
  buttonText: string;
  imageIcon?: any;
  loading?: boolean;
  defaultColor?: string;
  hoverColor?: string;
  mode?: string;
}

export const Button: FC<ButtonProps> = ({
  className,
  buttonText,
  disabled,
  imageIcon,
  loading,
  defaultColor,
  hoverColor,
  mode,
  ...props
}: ButtonProps) => {
  const solidBtnBg = `flex flex-1 justify-center items-center gap-2 rounded-[5px] w-full h-full transition duration-300 transform active:scale-95 ease-in-out outline bg-${defaultColor} text-white text-sm hover:bg-${hoverColor} disabled:cursor-not-allowed`;
  const outlineBtnBg = `flex flex-1 justify-center items-center gap-2 rounded-[5px] w-full h-full border-2 border-primary-1 bg-transparent text-${hoverColor} text-sm hover:bg-${hoverColor} hover:border-[0px] hover:text-white disabled:cursor-not-allowed cursor-pointer`;
  if (mode === "outline") {
    return (
      <button disabled={loading} className={outlineBtnBg} {...props}>
        {loading ? <Spinner /> : buttonText}
        {imageIcon !== undefined && (
          <img
            className="  w-[24px] h-[24px] bg-cover"
            src={imageIcon}
            alt="icon"
          />
        )}
      </button>
    );
  }
  if (mode === "solid") {
    return (
      <button
        type="submit"
        disabled={loading}
        className={solidBtnBg}
        {...props}
      >
        {imageIcon !== undefined && <div className="mr-2">{imageIcon}</div>}
        {loading ? <Spinner /> : buttonText}
      </button>
    );
  }
};
