import { styled } from "../../styles";
import * as Dialog from "@radix-ui/react-dialog";

export const CartContent = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,

  width: "30rem",
  backgroundColor: "$gray800",
  padding: "4.5rem 3rem 3rem",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
  display: "flex",
  flexDirection: "column",

  h2: {
    fontWeight: 700,
    fontSize: "$lg",
    color: "$gray100",
    marginBottom: "2rem",
  },

  "& > section": {
    overflowY: "auto",
    marginBottom: "2rem",
  },
});

export const CartClose = styled(Dialog.Close, {
  background: "none",
  border: "none",
  color: "$gray500",
  position: "absolute",
  top: "1.75rem",
  right: "1.75rem",
  lineHeight: 0,

  cursor: "pointer",
});

export const CartProductCard = styled("div", {
  width: "100%",
  display: "flex",
  gap: "1.25rem",
  alignItems: "center",
  height: "5.8125rem",

  "&:not(:last-child)": {
    marginBottom: "2rem",
  },
});

export const CartProductImageContainer = styled("div", {
  width: "6.3125rem",
  height: "5.8125rem",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",

  img: {
    objectFit: "cover",
  },
});

export const CartProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",

  p: {
    color: "$gray300",
    fontSize: "$md",
  },

  strong: {
    color: "$white",
    fontSize: "$md",
    fontWeight: 700,
    marginTop: "2px",
  },

  button: {
    width: "max-content",
    color: "$green500",
    fontSize: "1rem",
    fontWeight: 700,
    background: "none",
    border: "none",
    marginTop: "auto",

    cursor: "pointer",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const CartFooter = styled("footer", {
  display: "flex",
  flexDirection: "column",
  marginTop: "auto",

  button: {
    width: "100%",
    height: "4.3125rem",
    border: "none",
    borderRadius: 8,
    background: "$green500",
    color: "$white",
    fontSize: "$md",
    fontWeight: 700,

    cursor: "pointer",
    transition: "all 200ms ease-in-out",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      background: "$green300",
    },
  },
});

export const CartFooterDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginBottom: "3.4375rem",

  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    p: {
      color: "$gray300",
      fontSize: "$md",
    },

    "&:last-child": {
      fontWeight: 700,

      span: {
        fontSize: "$md",
      },

      p: {
        color: "$gray100",
        fontSize: "$xl",
      },
    },
  },
});
