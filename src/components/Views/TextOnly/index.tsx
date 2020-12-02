import React from 'react';

interface Props {
  title: string;
  description: string;
}

export const TextOnly: React.FC<Props> = ({ title, description }) => {
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <p>{description}</p>
    </React.Fragment>
  );
};

export default TextOnly;
