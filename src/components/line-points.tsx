import React, { FC, ReactNode, memo } from 'react';

interface ILinePoints {
  title: string,
  children: ReactNode,
  style: object
}

const LinePoints: FC<ILinePoints> = memo(({title, children, style}) => {
  return (
    <div style={{...style}}>
     {title}
     <div style={{display: "flex"}}>
      {children}
     </div>
    </div>
  );
})
export default LinePoints;
 