import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: IProps): JSX.Element => {
  return (
    <button onClick={props.onClick} disabled={props.disabled} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
