import React, { ButtonHTMLAttributes } from "react";

export interface EveButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  typeClass?: "primary" | "secondary" | "tertiary" | "ghost";
}

const EveButton: React.FC<EveButtonProps> = React.memo(
  ({ typeClass, children, ...props }) => {
    const { disabled, onClick, style, className, id } = props;

    return (
      <button
        className={`Eve-Button ${typeClass} ${className}`}
        style={style}
        onClick={onClick}
        disabled={disabled}
        id={id}
      >
        {children}
      </button>
    );
  }
);

export default EveButton;
