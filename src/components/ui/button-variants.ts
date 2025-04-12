import { cva } from "class-variance-authority";

export const buttonVariants = cva("base-class", {
  variants: {
    variant: {
      primary: "primary-class",
      secondary: "secondary-class",
    },
    size: {
      small: "small-class",
      large: "large-class",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "small",
  },
});
