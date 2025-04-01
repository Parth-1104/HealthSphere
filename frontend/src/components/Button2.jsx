import React from 'react';
import styled from 'styled-components';

const Button2 = ({ text, href }) => {
  return (
    <StyledWrapper>
      <a href={href} className="cssbuttons-io-button">
        <span>{text}</span>
      </a>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    padding: 0.7em 1.4em 0.7em 1.1em;
    color: white;
    background: #4F6AD5;
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
    letter-spacing: 0.05em;
    border-radius: 20em;
    text-decoration: none;
  }

  .cssbuttons-io-button:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #14a73e98;
  }

  .cssbuttons-io-button:active {
    box-shadow: 0 0.3em 1em -0.5em #14a73e98;
  }
`;

export default Button2;
