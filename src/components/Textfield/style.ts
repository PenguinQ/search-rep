import { css } from '@emotion/react';

export const Container = css`
  border: 1px solid #aab4c8;
  border-radius: 6px;
  padding: 0 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
  transition: border-color 300ms cubic-bezier(0.63, 0.01, 0.29, 1);

  input {
    width: 100%;
    font-size: 16px;
    line-height: 20px;
    border-radius: inherit;
    display: block;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    padding: 12px 0;

    &::placeholder {
      color: #d2d2d2;
    }
  }

  &[data-focus] {
    border-color: #16d379;
  }
`;
