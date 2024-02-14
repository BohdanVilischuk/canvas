import React, { FC } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useStage } from "../hooks/useStage";
import Button from "./button";
import LinePoints from "./line-points";
import Point from "./point";

export const StageComponent: FC = () => {
  const {
    size,
    lines,
    handleMouseDown,
    handleMouseMove,
    onPointerClick,
    changeSize,
    stageRef,
  } = useStage();
  console.log(lines);
  
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-evenly", margin: 20 }}
      >
        <Button title="Small" width={300} height={200} onClick={changeSize} />
        <Button title="Medium" width={600} height={400} onClick={changeSize} />
        <Button title="Large" width={900} height={600} onClick={changeSize} />
      </div>
      <Stage
        style={{ border: '1px solid grey' }}
        width={size.width}
        height={size.height}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onPointerClick={onPointerClick}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
      <Button
        title="Restore to default"
        width={1200}
        height={800}
        onClick={changeSize}
      />
      {lines.length ? <div style={{ border: "2px solid black", padding: 20, margin: 15 }}>
        {lines.map((line, index) => (
          <LinePoints
            key={Math.floor(Math.random() * Date.now())}
            style={{ display: "flex" }}
            title={`Line-${index + 1} points:`}
          >
            "
            {line?.points.map((point) => (
              <Point
                key={Math.random() + Date.now()}
                style={{ margin: "0 2px" }}
                point={point}
              />
            ))}
            "
          </LinePoints>
        ))}
      </div> : null}
    </div>
  );
};
