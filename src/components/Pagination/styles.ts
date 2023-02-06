import { css } from '@emotion/react';

export const Container = css`
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: 12px 0;

  button {
    min-width: 34px;
    background-color: transparent;
    border: 1px solid #aab4c8;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    padding: 4px;
    margin-left: -1px;
    transition: background-color 300ms cubic-bezier(0.63, 0.01, 0.29, 1);

    svg + svg {
      margin-left: -30px;
    }

    &:disabled {
      background-color: #e4ebf5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: #f0f3f7;
    }

    &:first-of-type {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      margin-left: 0;
    }

    &:last-of-type {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  div {
    display: flex;
    align-items: center;
    border-top: 1px solid #aab4c8;
    border-bottom: 1px solid #aab4c8;
    padding: 4px 8px;
  }
`;
