/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
import React from "react";
import { Point } from "../types/Point";
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
    allPoints: Array<Point>;
    isHighlighted?: boolean;
    showDebugGuideLines?: boolean;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    config?: ArrowConfig;
    tooltip?: string;
};
export declare const Arrow: ({ allPoints, isHighlighted, showDebugGuideLines, onMouseEnter, onMouseLeave, onClick, onMouseDown, config, tooltip, }: Props) => JSX.Element;
export {};
