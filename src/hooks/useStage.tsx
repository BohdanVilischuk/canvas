import { useState, useRef } from "react";
import Konva from "konva";

interface ISize {
  width: number;
  height: number;
}
export interface ILineProps {
  tool?: string;
  points: number[];
}

export const useStage = () => {
  const [size, setSize] = useState<ISize>({ width: 1200, height: 800 }); // Initial stage size
  const [tool, setTool] = useState<string>("pen"); // Initial tool
  const [lines, setLines] = useState<ILineProps[]>([]); // Initial lines array
  const stageRef = useRef(null);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = event.currentTarget.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        setLines([
          ...lines,
          { tool, points: [pointerPosition.x, pointerPosition.y] },
        ]);
      }
    }
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = event.currentTarget.getStage();
    if (stage) {
      const point = stage.getPointerPosition();
      if (point && lines.length > 0) {
        // Last point from last line
        const lastLine = lines[lines.length - 1];
        const lastPoints = lastLine.points;
        const startX = lastPoints[0];
        const startY = lastPoints[1];

        // Calculating, horizontal or vertical
        const isHorizontal =
          Math.abs(point.x - startX) > Math.abs(point.y - startY);

        // Set new points for horizontal or vertical movement
        const newPoints = isHorizontal
          ? [startX, startY, point.x, startY]
          : [startX, startY, startX, point.y];

        // Update last line with new points
        const updatedLines = lines.map((line, index) => {
          if (index === lines.length - 1) {
            return { ...line, points: newPoints };
          }
          return line;
        });

        setLines(updatedLines);
      }
    }
  };

  const onPointerClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = false;
  };
  const changeSize = (width: number, height: number) => {
    setSize({
      width: width,
      height: height,
    });
  };
  return {
    stageRef,
    size,
    setSize,
    tool,
    setTool,
    lines,
    setLines,
    handleMouseDown,
    handleMouseMove,
    onPointerClick,
    changeSize,
  };
};
