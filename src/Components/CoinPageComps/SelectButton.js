import React from "react";
import styled from "styled-components";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Button onClick={onClick} isSelected={selected}>
      {children}
    </Button>
  );
};

const Button = styled.span`
  border: 1px solid var(--clr-primary);
  border-radius: 5px;
  padding: var(--btn-padding);
  cursor: pointer;
  transition: all 200ms ease;
  background-color: ${(props) =>
    props.isSelected ? "var(--clr-primary)" : ""};
  color: ${(props) => (props.isSelected ? "#fff" : "")};
  font-weight: ${(props) => (props.isSelected ? 700 : 500)};

  &:hover {
    background-color: var(--clr-primary);
  }
`;

export default SelectButton;
