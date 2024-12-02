import classNames from "classnames";
import Link from "next/link";
import router from "next/router";
import React from "react";

interface ButtonProps {
  title: string;
  type?: string | undefined;
  color?: string | undefined;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  new_tab?: boolean;
  link?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  type,
  clickHandler,
  disabled = false,
  color,
  new_tab,
  link,
}) => {
  
  if (new_tab) {
    return (
      <Link
        className={classNames(`button`, type?.toLowerCase(), color?.toLowerCase(), disabled && "disabled")}
        href={link || "/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span> {title} </span>
      </Link>
    );
  } else {
    return (
      <button
        className={classNames(`button`, type?.toLowerCase(), color?.toLowerCase())}
        disabled={disabled}
        onClick={clickHandler ? clickHandler : () => router.push(link || "/")}
      >
       <span>{title}</span>
      </button>
    );
  }
};

export default Button;
