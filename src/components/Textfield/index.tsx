/** @jsxImportSource @emotion/react */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { Container } from './style';

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

interface TextfieldProps extends Omit<InputAttributes, 'type'> {
  type: 'text';
}

const Textfield = forwardRef<HTMLInputElement, TextfieldProps>((props, ref) => {
  const { type = 'text', autoFocus = false, ...otherProps } = props;
  const [focus, setFocus] = useState(autoFocus);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div css={Container} data-focus={focus ? true : undefined}>
      <input
        ref={inputRef}
        type={type}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...otherProps}
      />
    </div>
  );
});

export default Textfield;
