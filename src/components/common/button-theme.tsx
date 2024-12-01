"use client";
import React from "react";
import { Button } from "../ui";
import { useTheme } from "next-themes";
import {
  AccessibilityIcon
} from "@radix-ui/react-icons"


export const ButtonTheme = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button onClick={toggleTheme}>
      <AccessibilityIcon />
    </Button>
  );
};
