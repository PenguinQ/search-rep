/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { Container } from './style';

interface EmptyStateProps {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
}

const EmptyState = (props: EmptyStateProps) => {
  const { children, title, subtitle, ...otherProps } = props;

  return (
    <div css={Container} {...otherProps}>
      {title && <h2 data-wp-es-title>{title}</h2>}
      {subtitle && <p data-wp-es-subtitle>{subtitle}</p>}
      {children}
    </div>
  );
};

export default EmptyState;
