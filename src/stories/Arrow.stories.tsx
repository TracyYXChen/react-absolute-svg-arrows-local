/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */

import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import React from "react";

import { Arrow } from "../components/Arrow";
import { Point } from "../types/Point";

const isHighlighted = (defaultValue = false) =>
  boolean("Is highlighted", defaultValue);
const showDebugGuideLines = (defaultValue = false) =>
  boolean("Show debug guide lines", defaultValue);
const ar2ptAr = (arr: Array<Array<number>>) => {
  let allPoints = [];
  for(let ar of arr) {
    allPoints.push({
      x: ar[0],
      y: ar[1]
    })
  }
  return allPoints;
}

export const HighlightedArrow = () => {
  const Arr = [[82, 10], [82, 10], [58, 18], [58, 47], [34, 55], [34, 55]];
  let allPoints = ar2ptAr(Arr);
  return (
    <Arrow
      allPoints={allPoints}
      isHighlighted={isHighlighted(true)}
      showDebugGuideLines={showDebugGuideLines()}
      config={{arrowColor: 'red'}}
    />
  );
};

export const InversedArrow = () => {
  const Arr = [[10, 10], [10, 10], [100, 30], [100, 100]];
  let allPoints = ar2ptAr(Arr);

  return (
    <Arrow
      allPoints={allPoints}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines()}
      config={{arrowColor: 'black'}}
    />
  );
};

export const ArrowInOneLine = () => {
  const Arr = [[10, 10], [10, 10], [100, 30], [100, 100]];
  let allPoints = ar2ptAr(Arr);

  return (
    <>
      <Arrow
        allPoints={allPoints}
        isHighlighted={isHighlighted()}
        showDebugGuideLines={showDebugGuideLines()}
      />
      <Arrow
        allPoints={allPoints}
        isHighlighted={isHighlighted()}
        showDebugGuideLines={showDebugGuideLines()}
      />
      <Arrow
        allPoints={allPoints}
        isHighlighted={isHighlighted()}
        showDebugGuideLines={showDebugGuideLines()}
      />
    </>
  );
};

export const ArrowWithCustomConfig = () => {
  const Arr = [[10, 10], [10, 10], [100, 30], [100, 100]];
  let allPoints = ar2ptAr(Arr);

  const config = {
    arrowColor: "red",
    arrowHighlightedColor: "black",
    dotEndingBackground: "pink",
    dotEndingRadius: 15,
    arrowHeadEndingSize: 15,
    strokeWidth: 2,
  };

  return (
    <Arrow
      allPoints={allPoints}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines()}
      config={config}
    />
  );
};
export const ArrowWithVisibleControlPointsAndBoundingBox = () => {
  let Arr = [[600, 200], [400, 100]];
  let allPoints = ar2ptAr(Arr);

  return (
    <Arrow
      allPoints={allPoints}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines(true)}
    />
  );
};

export const Playground = () => {
  const options = {
    range: true,
    min: 5,
    max: 800,
    step: 1,
  };

  const startPoint = {
    x: number("Ax", 100, options),
    y: number("Ay", 100, options),
  };
  const endPoint = {
    x: number("Bx", 600, options),
    y: number("By", 300, options),
  };

  const config = object("Custom config", {
    arrowColor: "red",
    arrowHighlightedColor: "#4da6ff",
    controlPointsColor: "#fe4e4e",
    boundingBoxColor: "#fad1d1",
    dotEndingBackground: "#ffffff",
    dotEndingRadius: 3,
    arrowHeadEndingSize: 9,
    hoverableLineWidth: 10,
    strokeWidth: 1,
  });

  let allPoints = [startPoint, endPoint];

  return (
    <Arrow
      allPoints={allPoints}
      isHighlighted={isHighlighted()}
      showDebugGuideLines={showDebugGuideLines()}
      config={config}
    />
  );
};

export default {
  title: "Arrow",
  decorators: [withKnobs],
};
