/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
import React from "react";

import styled from "styled-components";

import {
  calculateDeltas,
  calculateCanvasDimensions,
  calculateControlPoints,
} from "../utils/arrow-utils";
import { Point } from "../types/Point";

const CONTROL_POINTS_RADIUS = 5;
const STRAIGHT_LINE_BEFORE_ARROW_HEAD = 0;

type ArrowConfig = {
  arrowColor?: string;
  arrowHighlightedColor?: string;
  controlPointsColor?: string;
  boundingBoxColor?: string;
  dotEndingBackground?: string;
  dotEndingRadius?: number;
  arrowHeadEndingSize?: number;
  hoverableLineWidth?: number;
  strokeWidth?: number;
};

type Props = {
  //startPoint: Point;
  allPoints: Array<Point>;
  //endPoint: Point;
  isHighlighted?: boolean;
  showDebugGuideLines?: boolean;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  onMouseDown? : (e: React.MouseEvent) => void;
  config?: ArrowConfig;
  tooltip?: string;
};

type TranslateProps = {
  $xTranslate: number;
  $yTranslate: number;
};

type LineProps = {
  $isHighlighted: boolean;
  $showDebugGuideLines?: boolean;
  $boundingBoxColor?: string;
} & TranslateProps;

const Line = styled.svg.attrs(({ $xTranslate, $yTranslate }: LineProps) => ({
  style: { transform: `translate(${$xTranslate}px, ${$yTranslate}px)` },
}))<LineProps>`
  pointer-events: none;
  z-index: ${({ $isHighlighted }) => ($isHighlighted ? 2 : 1)};
  position: absolute;
  left: 0;
  top: 0;
`;

const CurvedLine = styled(Line)`
  border: ${({ $showDebugGuideLines, $boundingBoxColor = "black" }) =>
    $showDebugGuideLines ? `dashed 1px ${$boundingBoxColor}` : "0"};
`;

const RenderedLine = styled.path`
  transition: stroke 300ms;
`;

const Endings = styled(Line)`
  pointer-events: none;
  z-index: ${({ $isHighlighted }) => ($isHighlighted ? 11 : 10)};
`;

const ArrowHeadEnding = styled.path.attrs(
  ({ $xTranslate, $yTranslate }: TranslateProps) => ({
    style: { transform: `translate(${$xTranslate}px, ${$yTranslate}px)` },
  })
)<TranslateProps>`
  transition: stroke 300ms;
`;

const DotEnding = styled.circle`
  transition: stroke 300ms;
`;

const HoverableLine = styled.path`
  cursor: default;
`;

const HoverableArrowHeadEnding = styled(ArrowHeadEnding)`
  cursor: default;
`;

const HoverableDotEnding = styled.circle`
  cursor: default;
`;

const ControlPoints = ({
  p1,
  p2,
  p3,
  p4,
  color,
}: {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;
  color: string;
}) => {
  return (
    <>
      <circle
        cx={p2.x}
        cy={p2.y}
        r={CONTROL_POINTS_RADIUS}
        strokeWidth="0"
        fill={color}
      />
      <circle
        cx={p3.x}
        cy={p3.y}
        r={CONTROL_POINTS_RADIUS}
        strokeWidth="0"
        fill={color}
      />
      <line
        strokeDasharray="1,3"
        stroke={color}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
      />
      <line
        strokeDasharray="1,3"
        stroke={color}
        x1={p3.x}
        y1={p3.y}
        x2={p4.x}
        y2={p4.y}
      />
    </>
  );
};

export const Arrow = ({
  allPoints,
  isHighlighted = false,
  showDebugGuideLines = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onMouseDown,
  config,
  tooltip,
}: Props) => {
  const defaultConfig = {
    arrowColor: "#bcc4cc",
    arrowHighlightedColor: "#4da6ff",
    controlPointsColor: "#ff4747",
    boundingBoxColor: "#ffcccc",
    dotEndingBackground: "#fff",
    dotEndingRadius: 3,
    arrowHeadEndingSize: 29,
    hoverableLineWidth: 15,
    strokeWidth: 1,
  };
  const currentConfig = {
    ...defaultConfig,
    ...config,
  };

  const {
    arrowColor,
    arrowHighlightedColor,
    controlPointsColor,
    boundingBoxColor,
    arrowHeadEndingSize,
    strokeWidth,
    hoverableLineWidth,
    dotEndingBackground,
    dotEndingRadius,
  } = currentConfig;

  const arrowHeadOffset = arrowHeadEndingSize / 2;
  const boundingBoxElementsBuffer =
    strokeWidth +
    arrowHeadEndingSize / 2 +
    dotEndingRadius +
    CONTROL_POINTS_RADIUS / 2;
  const startPoint = allPoints[0];
  const endPoint = allPoints[allPoints.length - 1];
  const { absDx, absDy, dx, dy } = calculateDeltas(allPoints);
  let { p1, p2, p3, p4, boundingBoxBuffer } = calculateControlPoints({
    boundingBoxElementsBuffer,
    dx,
    dy,
    absDx,
    absDy,
  });

  
 
  

 

  const { canvasWidth, canvasHeight } = calculateCanvasDimensions({
    absDx,
    absDy,
    boundingBoxBuffer,
  });

  const canvasXOffset =
    Math.min(startPoint.x, endPoint.x) - boundingBoxBuffer.horizontal;
  const canvasYOffset =
    Math.min(startPoint.y, endPoint.y) - boundingBoxBuffer.vertical;
  //console.log(canvasXOffset, canvasYOffset);
  // const curvedLinePath = `
  // M ${p1.x} ${p1.y} C ${p4.x} ${p1.y} ${p1.x} ${p4.y} ${p4.x} ${p4.y}`;
  let curvedLinePath;
  let arrowHeadHeight = 8;
  let arrowOffset = arrowHeadHeight + strokeWidth;
  const getBezierPath = (ptArr: Array<Point>) => {
    let ptStr = '';
    const n = ptArr.length;
    let pA = ptArr[0];
    let pB;
    for(let i=1;i<n-1;i++) {
      pB = ptArr[i];
      ptStr += `M ${pA.x} ${pA.y} C ${pA.x} ${pB.y} ${pB.x} ${pA.y} ${pB.x} ${pB.y} `;
      pA = pB;
    }
    let pN = ptArr[n-1];
    //ptStr += `L ${pN[0]} ${pN[1]}`;
    ptStr += `M ${pA.x} ${pA.y} C ${pA.x} ${pN.y} ${pN.x} ${pA.y} ${pN.x} ${pN.y - arrowOffset} `;
    return ptStr;
  }


  let xOff = startPoint.x - p1.x;
  let yOff = startPoint.y - p1.y;
  let transformedPoints = [];
  for(let pt of allPoints) {
    transformedPoints.push({
      x: pt.x - xOff,
      y: pt.y - yOff
    });
  }

  curvedLinePath = getBezierPath(transformedPoints);
  
  const getStrokeColor = () => {
    if (isHighlighted) return arrowHighlightedColor;

    return arrowColor;
  };
  
  const markID = `arrowhead-${startPoint.x}-${startPoint.y}-${endPoint.x}-${endPoint.y}`;
  const strokeColor = getStrokeColor();

  return (
    <>
      <CurvedLine
        width={canvasWidth}
        height={canvasHeight}
        $isHighlighted={isHighlighted}
        $showDebugGuideLines={showDebugGuideLines}
        $boundingBoxColor={boundingBoxColor}
        $xTranslate={canvasXOffset}
        $yTranslate={canvasYOffset}
      >
        <defs>
          <marker id={markID} markerWidth="6" markerHeight="8" refX="0" refY="4" orient="auto">
               <polygon points="0 0, 6 4, 0 8" fill={arrowColor}></polygon>
          </marker>
        </defs> 
         
     

        <RenderedLine
          d={curvedLinePath}
          //d={`M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`}
          strokeWidth={strokeWidth}
          stroke={getStrokeColor()}
          fill="none"
          markerEnd={`url(#${markID})`}
        /> 
      
       
        <HoverableLine
          d={curvedLinePath}
          //d={`M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`}
          strokeWidth={hoverableLineWidth}
          stroke="transparent"
          pointerEvents="all"
          fill="none"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          onMouseDown={onMouseDown}
        >
          {tooltip && <title>{tooltip}</title>}
        </HoverableLine>
        {/* <line x1={p1.x + 20} y1={p1.y} x2={p4.x + 20} y2={p4.y} stroke='green' strokeWidth={strokeWidth} /> */}
        {/* <HoverableArrowHeadEnding
          d={arrowPath}
          fill="none"
          stroke="transparent"
          strokeWidth={hoverableLineWidth}
          strokeLinecap="round"
          pointerEvents="all"
          $xTranslate={p4.x - arrowHeadOffset * 2}
          $yTranslate={p4.y - arrowHeadOffset}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          onMouseDown={onMouseDown}
        >
          {tooltip && <title>{tooltip}</title>}
        </HoverableArrowHeadEnding> */}
        <HoverableDotEnding
          cx={p1.x}
          cy={p1.y}
          r={dotEndingRadius}
          stroke="transparent"
          strokeWidth={hoverableLineWidth}
          fill="transparent"
        >
          {tooltip && <title>{tooltip}</title>}
        </HoverableDotEnding>
      </CurvedLine>

      <Endings
        width={canvasWidth}
        height={canvasHeight}
        $isHighlighted={isHighlighted}
        $xTranslate={canvasXOffset}
        $yTranslate={canvasYOffset}
      >
        <DotEnding
          cx={p1.x}
          cy={p1.y}
          r={dotEndingRadius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={dotEndingBackground}
        />
        {/* <ArrowHeadEnding
          d={arrowPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          //$xTranslate={p4.x - arrowHeadOffset * 2}
          //$yTranslate={p4.y - arrowHeadOffset}
          $xTranslate={p4.x - arrowHeadOffset * 2}
          $yTranslate={p4.y - arrowHeadOffset}
        /> */}
        
        {/* <line x1={startPoint.x} y1={startPoint.y} x2={endPoint.x} y2={endPoint.y} stroke="black" 
        strokeWidth={strokeWidth} markerEnd={`url(#${markID})`} />  */}
        
        {showDebugGuideLines && (
          <ControlPoints
            p1={p1}
            p2={p2}
            p3={p3}
            p4={p4}
            color={controlPointsColor}
          />
        )}
      </Endings>
    </>
  );
};
