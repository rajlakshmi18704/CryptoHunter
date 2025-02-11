import { styled } from "@mui/material";

const StyledButton = styled("span")(({ selected }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: "10px 20px",
  fontFamily: "Montserrat",
  cursor: "pointer",
  backgroundColor: selected ? "gold" : "transparent",
  color: selected ? "black" : "inherit",
  fontWeight: selected ? 700 : 500,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
  width: "fit-content",
  textAlign: "center",
  display: "inline-block",
}));

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;
