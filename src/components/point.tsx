import React, { FC, memo } from 'react';

interface IPointProps {
  point: number,
  style: object
}


const Point: FC<IPointProps> = memo(({point, style}) => {
  return (
     <div style={{...style}}>
      {point}
     </div>
  );
})

export default Point;
 