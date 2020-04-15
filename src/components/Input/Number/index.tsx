import * as React from 'react';

interface IProps {
  name?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const NumberInput = (props: IProps): JSX.Element => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(parseInt(event.target.value, 10));
  };

  return (
    <input
      name={props.name}
      type='number'
      value={props.value.toString()}
      onChange={onChange}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  );
};

export default NumberInput;
