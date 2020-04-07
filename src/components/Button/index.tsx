import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button = (props: IProps): JSX.Element => {
  return <button onClick={props.onClick}>{props.children}</button>;
};

export default Button;
