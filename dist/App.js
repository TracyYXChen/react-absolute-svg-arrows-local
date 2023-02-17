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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var MAX_Y_CONTROL_POINT_SHIFT = 0;
export var calculateLowDyControlPointShift = function (dx, dy, maxShift) {
    if (maxShift === void 0) { maxShift = MAX_Y_CONTROL_POINT_SHIFT; }
    if (dx > 0)
        return 0;
    var sign = dy < 0 ? -1 : 1;
    var value = Math.round(maxShift * Math.pow(0.9, Math.pow(1.2, Math.abs(dy) / 10)));
    // prevent negative zero
    if (value === 0)
        return 0;
    return sign * value;
};
export var calculateDeltas = function (startPoint, targetPoint) {
    var dx = targetPoint.x - startPoint.x;
    var dy = targetPoint.y - startPoint.y;
    var absDx = Math.abs(dx);
    var absDy = Math.abs(dy);
    return { dx: dx, dy: dy, absDx: absDx, absDy: absDy };
};
// Curve flexure should remain on the same area no matter of absolute deltas, so we have to slightly shift X coordinates of our control points. It was created empirically, it's not based on a clear formula.
var calculateFixedLineInflectionConstant = function (absDx, absDy) {
    var WEIGHT_X = 0;
    var WEIGHT_Y = 0;
    return Math.round(Math.sqrt(absDx) * WEIGHT_X + Math.sqrt(absDy) * WEIGHT_Y);
};
export var calculateControlPoints = function (_a) {
    var _b, _c;
    var absDx = _a.absDx, absDy = _a.absDy, dx = _a.dx, dy = _a.dy;
    var leftTopX = 0;
    var leftTopY = 0;
    var rightBottomX = absDx;
    var rightBottomY = absDy;
    if (dx < 0)
        _b = [rightBottomX, leftTopX], leftTopX = _b[0], rightBottomX = _b[1];
    if (dy < 0)
        _c = [rightBottomY, leftTopY], leftTopY = _c[0], rightBottomY = _c[1];
    var fixedLineInflectionConstant = calculateFixedLineInflectionConstant(absDx, absDy);
    var lowDyYShift = calculateLowDyControlPointShift(dx, dy);
    var p1 = {
        x: leftTopX,
        y: leftTopY,
    };
    var p2 = {
        x: leftTopX + fixedLineInflectionConstant,
        y: leftTopY + lowDyYShift,
    };
    var p3 = {
        x: rightBottomX - fixedLineInflectionConstant,
        y: rightBottomY - lowDyYShift,
    };
    var p4 = {
        x: rightBottomX,
        y: rightBottomY,
    };
    return { p1: p1, p2: p2, p3: p3, p4: p4 };
};
export var calculateControlPointsWithBuffer = function (_a) {
    var boundingBoxElementsBuffer = _a.boundingBoxElementsBuffer, absDx = _a.absDx, absDy = _a.absDy, dx = _a.dx, dy = _a.dy;
    var _b = calculateControlPoints({
        absDx: absDx,
        absDy: absDy,
        dx: dx,
        dy: dy,
    }), p1 = _b.p1, p2 = _b.p2, p3 = _b.p3, p4 = _b.p4;
    var topBorder = Math.min(p1.y, p2.y, p3.y, p4.y);
    var bottomBorder = Math.max(p1.y, p2.y, p3.y, p4.y);
    var leftBorder = Math.min(p1.x, p2.x, p3.x, p4.x);
    var rightBorder = Math.max(p1.x, p2.x, p3.x, p4.x);
    var verticalBuffer = (bottomBorder - topBorder - absDy) / 2 + boundingBoxElementsBuffer;
    var horizontalBuffer = (rightBorder - leftBorder - absDx) / 2 + boundingBoxElementsBuffer;
    var boundingBoxBuffer = {
        vertical: verticalBuffer,
        horizontal: horizontalBuffer,
    };
    return {
        p1: {
            x: p1.x + horizontalBuffer,
            y: p1.y + verticalBuffer,
        },
        p2: {
            x: p2.x + horizontalBuffer,
            y: p2.y + verticalBuffer,
        },
        p3: {
            x: p3.x + horizontalBuffer,
            y: p3.y + verticalBuffer,
        },
        p4: {
            x: p4.x + horizontalBuffer,
            y: p4.y + verticalBuffer,
        },
        boundingBoxBuffer: boundingBoxBuffer,
    };
};
export var calculateCanvasDimensions = function (_a) {
    var absDx = _a.absDx, absDy = _a.absDy, boundingBoxBuffer = _a.boundingBoxBuffer;
    var canvasWidth = absDx + 2 * boundingBoxBuffer.horizontal;
    var canvasHeight = absDy + 2 * boundingBoxBuffer.vertical;
    return { canvasWidth: canvasWidth, canvasHeight: canvasHeight };
};
var Arrow = function (_a) {
    var startPoint = _a.startPoint, endPoint = _a.endPoint;
    var canvasStartPoint = {
        x: Math.min(startPoint.x, endPoint.x),
        y: Math.min(startPoint.y, endPoint.y)
    };
    // const canvasWidth = Math.abs(endPoint.x - startPoint.x)
    // const canvasHeight = Math.abs(endPoint.y - startPoint.y)
    var _b = calculateDeltas(startPoint, endPoint), absDx = _b.absDx, absDy = _b.absDy, dx = _b.dx, dy = _b.dy;
    var strokeWidth = 1;
    var arrowHeadEndingSize = 10;
    var boundingBoxElementsBuffer = strokeWidth + arrowHeadEndingSize;
    var STRAIGHT_LINE_BEFORE_ARROW_HEAD = 5;
    var _c = calculateControlPointsWithBuffer({
        boundingBoxElementsBuffer: boundingBoxElementsBuffer,
        dx: dx,
        dy: dy,
        absDx: absDx,
        absDy: absDy,
    }), p1 = _c.p1, p2 = _c.p2, p3 = _c.p3, p4 = _c.p4, boundingBoxBuffer = _c.boundingBoxBuffer;
    var _d = calculateCanvasDimensions({
        absDx: absDx,
        absDy: absDy,
        boundingBoxBuffer: boundingBoxBuffer,
    }), canvasWidth = _d.canvasWidth, canvasHeight = _d.canvasHeight;
    var canvasXOffset = Math.min(startPoint.x, endPoint.x) - boundingBoxBuffer.horizontal;
    var canvasYOffset = Math.min(startPoint.y, endPoint.y) - boundingBoxBuffer.vertical;
    return (_jsxs("svg", __assign({ width: canvasWidth, height: canvasHeight, style: {
            backgroundColor: "#eee",
            transform: "translate(".concat(canvasXOffset, "px, ").concat(canvasYOffset, "px)")
        } }, { children: [_jsx("path", { stroke: "black", strokeWidth: strokeWidth, fill: "none", d: "\n        M ".concat(p1.x, " ").concat(p1.y, "\n        C ").concat(p2.x, " ").concat(p2.y, ",\n        ").concat(p3.x, " ").concat(p3.y, ",\n        ").concat(p4.x - STRAIGHT_LINE_BEFORE_ARROW_HEAD, " ").concat(p4.y, "\n        L ").concat(p4.x, " ").concat(p4.y) }), _jsx("path", { d: "\n  M ".concat((arrowHeadEndingSize / 5) * 2, " 0\n  L ").concat(arrowHeadEndingSize, " ").concat(arrowHeadEndingSize / 2, "\n  L ").concat((arrowHeadEndingSize / 5) * 2, " ").concat(arrowHeadEndingSize), fill: "none", stroke: "black", style: { transform: "translate(".concat(p4.x - arrowHeadEndingSize, "px, ").concat(p4.y - arrowHeadEndingSize / 2, "px)") } })] })));
};
function App() {
    var featureAPosition = {
        x: 100,
        y: 200,
    };
    var featureBPosition = {
        x: 700,
        y: 200,
    };
    return (_jsx(Arrow, { startPoint: featureBPosition, endPoint: featureAPosition }));
}
export default App;
