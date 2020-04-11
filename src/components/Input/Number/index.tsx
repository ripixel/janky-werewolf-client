import * as React from 'react';

interface IProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const NumberInput = (props: IProps): JSX.Element => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(parseInt(event.target.value, 10));
  };

  return (
    <input
      type='number'
      value={props.value.toString()}
      onChange={onChange}
      placeholder={props.placeholder}
    />
  );
};

export default NumberInput;
