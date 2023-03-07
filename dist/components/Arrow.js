var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { calculateDeltas, calculateCanvasDimensions, calculateControlPoints, } from "../utils/arrow-utils";
var CONTROL_POINTS_RADIUS = 5;
var STRAIGHT_LINE_BEFORE_ARROW_HEAD = 0;
var Line = styled.svg.attrs(function (_a) {
    var $xTranslate = _a.$xTranslate, $yTranslate = _a.$yTranslate;
    return ({
        style: { transform: "translate(".concat($xTranslate, "px, ").concat($yTranslate, "px)") },
    });
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  pointer-events: none;\n  z-index: ", ";\n  position: absolute;\n  left: 0;\n  top: 0;\n"], ["\n  pointer-events: none;\n  z-index: ", ";\n  position: absolute;\n  left: 0;\n  top: 0;\n"])), function (_a) {
    var $isHighlighted = _a.$isHighlighted;
    return ($isHighlighted ? 2 : 1);
});
var CurvedLine = styled(Line)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border: ", ";\n"], ["\n  border: ", ";\n"])), function (_a) {
    var $showDebugGuideLines = _a.$showDebugGuideLines, _b = _a.$boundingBoxColor, $boundingBoxColor = _b === void 0 ? "black" : _b;
    return $showDebugGuideLines ? "dashed 1px ".concat($boundingBoxColor) : "0";
});
var RenderedLine = styled.path(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  transition: stroke 300ms;\n"], ["\n  transition: stroke 300ms;\n"])));
var Endings = styled(Line)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  pointer-events: none;\n  z-index: ", ";\n"], ["\n  pointer-events: none;\n  z-index: ", ";\n"])), function (_a) {
    var $isHighlighted = _a.$isHighlighted;
    return ($isHighlighted ? 11 : 10);
});
var ArrowHeadEnding = styled.path.attrs(function (_a) {
    var $xTranslate = _a.$xTranslate, $yTranslate = _a.$yTranslate;
    return ({
        style: { transform: "translate(".concat($xTranslate, "px, ").concat($yTranslate, "px)") },
    });
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  transition: stroke 300ms;\n"], ["\n  transition: stroke 300ms;\n"])));
var DotEnding = styled.circle(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  transition: stroke 300ms;\n"], ["\n  transition: stroke 300ms;\n"])));
var HoverableLine = styled.path(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  cursor: default;\n"], ["\n  cursor: default;\n"])));
var HoverableArrowHeadEnding = styled(ArrowHeadEnding)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  cursor: default;\n"], ["\n  cursor: default;\n"])));
var HoverableDotEnding = styled.circle(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  cursor: default;\n"], ["\n  cursor: default;\n"])));
var ControlPoints = function (_a) {
    var p1 = _a.p1, p2 = _a.p2, p3 = _a.p3, p4 = _a.p4, color = _a.color;
    return (_jsxs(_Fragment, { children: [_jsx("circle", { cx: p2.x, cy: p2.y, r: CONTROL_POINTS_RADIUS, strokeWidth: "0", fill: color }), _jsx("circle", { cx: p3.x, cy: p3.y, r: CONTROL_POINTS_RADIUS, strokeWidth: "0", fill: color }), _jsx("line", { strokeDasharray: "1,3", stroke: color, x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }), _jsx("line", { strokeDasharray: "1,3", stroke: color, x1: p3.x, y1: p3.y, x2: p4.x, y2: p4.y })] }));
};
export var Arrow = function (_a) {
    var startPoint = _a.startPoint, endPoint = _a.endPoint, _b = _a.isHighlighted, isHighlighted = _b === void 0 ? false : _b, _c = _a.showDebugGuideLines, showDebugGuideLines = _c === void 0 ? false : _c, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, onClick = _a.onClick, onMouseDown = _a.onMouseDown, config = _a.config, tooltip = _a.tooltip;
    //console.log(startPoint, endPoint);
    var defaultConfig = {
        //"#bcc4cc"
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
    var currentConfig = __assign(__assign({}, defaultConfig), config);
    var arrowColor = currentConfig.arrowColor, arrowHighlightedColor = currentConfig.arrowHighlightedColor, controlPointsColor = currentConfig.controlPointsColor, boundingBoxColor = currentConfig.boundingBoxColor, arrowHeadEndingSize = currentConfig.arrowHeadEndingSize, strokeWidth = currentConfig.strokeWidth, hoverableLineWidth = currentConfig.hoverableLineWidth, dotEndingBackground = currentConfig.dotEndingBackground, dotEndingRadius = currentConfig.dotEndingRadius;
    var arrowHeadOffset = arrowHeadEndingSize / 2;
    var boundingBoxElementsBuffer = strokeWidth +
        arrowHeadEndingSize / 2 +
        dotEndingRadius +
        CONTROL_POINTS_RADIUS / 2;
    var _d = calculateDeltas(startPoint, endPoint), absDx = _d.absDx, absDy = _d.absDy, dx = _d.dx, dy = _d.dy;
    var _e = calculateControlPoints({
        boundingBoxElementsBuffer: boundingBoxElementsBuffer,
        dx: dx,
        dy: dy,
        absDx: absDx,
        absDy: absDy,
    }), p1 = _e.p1, p2 = _e.p2, p3 = _e.p3, p4 = _e.p4, boundingBoxBuffer = _e.boundingBoxBuffer;
    var _f = calculateCanvasDimensions({
        absDx: absDx,
        absDy: absDy,
        boundingBoxBuffer: boundingBoxBuffer,
    }), canvasWidth = _f.canvasWidth, canvasHeight = _f.canvasHeight;
    var canvasXOffset = Math.min(startPoint.x, endPoint.x) - boundingBoxBuffer.horizontal;
    var canvasYOffset = Math.min(startPoint.y, endPoint.y) - boundingBoxBuffer.vertical;
    // const curvedLinePath = `
    //   M ${p1.x} ${p1.y}
    //   C ${p2.x} ${p2.y},
    //   ${p3.x} ${p3.y},
    //   ${p4.x - STRAIGHT_LINE_BEFORE_ARROW_HEAD} ${p4.y}
    //   L ${p4.x} ${p4.y}`;
    // const curvedLinePath = `
    //   M ${p1.x} ${p1.y}
    //   L ${p4.x} ${p4.y}`;
    // const curvedLinePath = `
    // M ${p1.x} ${p1.y} C ${p4.x} ${p1.y} ${p1.x} ${p4.y} ${p4.x} ${p4.y}`;
    var arrowHeight = 8;
    var curvedLinePath = "\n  M ".concat(p1.x, " ").concat(p1.y, " C ").concat(p1.x, " ").concat(p4.y, " ").concat(p4.x, " ").concat(p1.y, " ").concat(p4.x, " ").concat(p4.y + arrowHeight);
    var getStrokeColor = function () {
        if (isHighlighted)
            return arrowHighlightedColor;
        return arrowColor;
    };
    //console.log("p4", p4.x, p4.y);
    //console.log("end point", endPoint.x, endPoint.y);
    var markID = "arrowhead-".concat(startPoint.x, "-").concat(startPoint.y, "-").concat(endPoint.x, "-").concat(endPoint.y);
    var strokeColor = getStrokeColor();
    //console.log(markID);
    return (_jsxs(_Fragment, { children: [_jsxs(CurvedLine, __assign({ width: canvasWidth, height: canvasHeight, "$isHighlighted": isHighlighted, "$showDebugGuideLines": showDebugGuideLines, "$boundingBoxColor": boundingBoxColor, "$xTranslate": canvasXOffset, "$yTranslate": canvasYOffset }, { children: [_jsx("defs", { children: _jsx("marker", __assign({ id: markID, markerWidth: "6", markerHeight: "8", refX: "5", refY: "4", orient: "auto" }, { children: _jsx("polygon", { points: "0 0, 6 4, 0 8", fill: arrowColor }) })) }), _jsx(RenderedLine, { d: curvedLinePath, 
                        //d={`M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`}
                        strokeWidth: strokeWidth, stroke: getStrokeColor(), fill: "none", markerEnd: "url(#".concat(markID, ")") }), _jsx(HoverableLine, __assign({ d: curvedLinePath, 
                        //d={`M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`}
                        strokeWidth: hoverableLineWidth, stroke: "transparent", pointerEvents: "all", fill: "none", onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onClick: onClick, onMouseDown: onMouseDown }, { children: tooltip && _jsx("title", { children: tooltip }) })), _jsx(HoverableDotEnding, __assign({ cx: p1.x, cy: p1.y, r: dotEndingRadius, stroke: "transparent", strokeWidth: hoverableLineWidth, fill: "transparent" }, { children: tooltip && _jsx("title", { children: tooltip }) }))] })), _jsxs(Endings, __assign({ width: canvasWidth, height: canvasHeight, "$isHighlighted": isHighlighted, "$xTranslate": canvasXOffset, "$yTranslate": canvasYOffset }, { children: [_jsx(DotEnding, { cx: p1.x, cy: p1.y, r: dotEndingRadius, stroke: strokeColor, strokeWidth: strokeWidth, fill: dotEndingBackground }), showDebugGuideLines && (_jsx(ControlPoints, { p1: p1, p2: p2, p3: p3, p4: p4, color: controlPointsColor }))] }))] }));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
