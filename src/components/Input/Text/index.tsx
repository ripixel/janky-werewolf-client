import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextInput: React.FC<Props> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event.target.value);
  };

  return (
    <input
      type='text'
      value={props.value}
      onChange={onChange}
      placeholder={props.placeholder}
    />
  );
};

export default TextInput;
