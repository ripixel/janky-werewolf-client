import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = (props: IProps): JSX.Element => {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
