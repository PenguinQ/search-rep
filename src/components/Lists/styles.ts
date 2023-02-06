import { css } from '@emotion/react';

export const Container = css`
  color: #323232;
  font-weight: bold;
  font-size: 16px;
  background-color: #ffffff;
  border: 1px solid #aab4c8;
  text-decoration: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 14px;
  cursor: pointer;
  transition: background-color 300ms cubic-bezier(0.63, 0.01, 0.29, 1);

  &:hover {
    background-color: #f0f3f7;
  }

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
