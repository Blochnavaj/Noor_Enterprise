 import React from "react";
import styled from "styled-components";

const Input = ({ label, name, value, onChange, placeholder, type = "text" }) => {
  return (
    <StyledWrapper>
      <div className="inputGroup">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          autoComplete="off"
          placeholder={placeholder}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .inputGroup {
    font-family: "Segoe UI", sans-serif;
    margin: 0.8em 0;
    position: relative;
    width: 100%;
  }

  .inputGroup input {
    font-size: 1rem;
    padding: 1em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 14px;
    width: 100%;
  }

  .inputGroup label {
    font-size: 95%;
    position: absolute;
    left: 0;
    padding: 1em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
  }

  .inputGroup :is(input:focus, input:valid) ~ label {
    transform: translateY(-50%) scale(0.9);
    margin-left: 1.2em;
    padding: 0.4em;
    background-color: #f2f2f2;
  }

  .inputGroup :is(input:focus, input:valid) {
    border-color: rgb(150, 150, 200);
  }
`;

export default Input;
