// frontend/app/components/Button.tsx
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { BUTTON_VARIANTS, SPACING, ROUNDED, TEXT } from "../constants/Theme";

interface ButtonProps extends TouchableOpacityProps {
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof SPACING;
  rounded?: keyof typeof ROUNDED;
  label: string;
}

export const Button = ({
  variant = "primary",
  size = "md",
  rounded = "md",
  label,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`
        ${BUTTON_VARIANTS[variant]}
        ${SPACING[size]}
        ${ROUNDED[rounded]}
        items-center
        justify-center
        ${className}
      `}
      {...props}
    >
      <Text
        className={`
          ${TEXT.md}
          font-semibold
          ${
            variant === "outline" || variant === "ghost"
              ? "text-primary-500"
              : "text-white"
          }
        `}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
