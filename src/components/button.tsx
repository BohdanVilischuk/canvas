import React, { FC } from 'react';

interface IButton {
  title: string,
  onClick: (width: number, height: number) => void,
  width: number,
  height: number
}
const Button: FC<IButton> = ({title, onClick, width, height}) => {
  return (
    <button onClick={() => onClick(width, height)}>
      {title}
    </button>
  );
}

export default Button;
 