import { styled } from "../../styles";

export const CartButtonContainer = styled("button", {
  width: "3rem",
  height: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 6,
  backgroundColor: "$gray800",
  color: "$gray500",

  position: "relative",
  cursor: "pointer",

  transition: "all 200ms ease-in-out",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    backgroundColor: "$gray700",
  },

  svg: {
    fontSize: 24,
  },

  variants: {
    size: {
      large: {
        width: "3.5rem",
        height: "3.5rem",

        svg: {
          fontSize: 32,
        },
      },
    },

    bgColor: {
      green: {
        color: "$white",
        backgroundColor: "$green500",

        "&:not(:disabled):hover": {
          backgroundColor: "$green300",
        },
      },
    },
  },
});
