import { css } from '@emotion/react';

export const App = css`
  padding: 16px;

  h1 {
    text-align: center;
    margin: 32px 0;
  }
`;

export const Container = css`
  width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ListContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #aab4c8;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
  padding: 16px;
`;
