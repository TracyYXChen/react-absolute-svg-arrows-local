import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import { Arrow } from "../components/Arrow";
var isHighlighted = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    return boolean("Is highlighted", defaultValue);
};
var showDebugGuideLines = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    return boolean("Show debug guide lines", defaultValue);
};
var ar2ptAr = function (arr) {
    var allPoints = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var ar = arr_1[_i];
        allPoints.push({
            x: ar[0],
            y: ar[1]
        });
    }
    return allPoints;
};
export var HighlightedArrow = function () {
    //const Arr = [[82, 10], [82, 10], [58, 18], [58, 47], [34, 55], [34, 55]];
    var Arr = [[200, 600], [200, 600], [400, 700], [400, 700]];
    var allPoints = ar2ptAr(Arr);
    return (_jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(true), showDebugGuideLines: showDebugGuideLines(), config: { arrowColor: 'red' } }));
};
export var InversedArrow = function () {
    var Arr = [[10, 10], [10, 10], [100, 30], [100, 100]];
    var allPoints = ar2ptAr(Arr);
    return (_jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(), config: { arrowColor: 'black' } }));
};
export var ArrowInOneLine = function () {
    var Arr = [[10, 10], [10, 10], [100, 30], [100, 100]];
    var allPoints = ar2ptAr(Arr);
    return (_jsxs(_Fragment, { children: [_jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }), _jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() }), _jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines() })] }));
};
export var ArrowWithCustomConfig = function () {
    var Arr = [[10, 10], [10, 10], [100, 30], [100, 100]];
    var allPoints = ar2ptAr(Arr);
    var config = {
        arrowColor: "red",
        arrowHighlightedColor: "black",
        dotEndingBackground: "pink",
        dotEndingRadius: 15,
        arrowHeadEndingSize: 15,
        strokeWidth: 2,
    };
    return (_jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(), config: config }));
};
export var ArrowWithVisibleControlPointsAndBoundingBox = function () {
    var Arr = [[600, 200], [400, 100]];
    var allPoints = ar2ptAr(Arr);
    return (_jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(true) }));
};
export var Playground = function () {
    var options = {
        range: true,
        min: 5,
        max: 800,
        step: 1,
    };
    var startPoint = {
        x: number("Ax", 100, options),
        y: number("Ay", 100, options),
    };
    var endPoint = {
        x: number("Bx", 600, options),
        y: number("By", 300, options),
    };
    var config = object("Custom config", {
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
    var allPoints = [startPoint, endPoint];
    return (_jsx(Arrow, { allPoints: allPoints, isHighlighted: isHighlighted(), showDebugGuideLines: showDebugGuideLines(), config: config }));
};
export default {
    title: "Arrow",
    decorators: [withKnobs],
};
