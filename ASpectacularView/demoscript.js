
    var draw   = SVG('drawing').size(400, 400),
        spiral = draw.path('M200 28c103.8 33.7 160.7 145.2 127 249-27 83.1-116.1 128.6-199.2 101.6C61.3 357 25 285.7 46.5 219.2c17.2-53.2 74.3-82.3 127.5-65 42.5 13.8 65.8 59.5 52 102-11 34-47.6 52.7-81.6 41.6-27.2-8.8-42.1-38.1-33.3-65.3 7.1-21.8 30.4-33.7 52.2-26.6 17.4 5.7 27 24.4 21.3 41.8-4.5 13.9-19.5 21.6-33.4 17')
                .attr({
                    fill          : 'none',
                    stroke        : 'cadetblue',
                    'stroke-width': 2
                }),
        curve  = draw.path('M20,20 C90,90, 80,40, 200,80z')
                .attr({
                    fill          : 'green',
                    stroke        : 'green',
                    'stroke-width': 5
                }),
        curve2  = draw.path('M99,79c18.6,5.2,43.1,15.6,56,38c21.7,37.7-10.1,72.9,9,105c19.4,32.6,79.5,42.2,124,25 c46.4-18,77.8-65.9,79-121')
                .attr({
                    fill          : 'none',
                    stroke        : 'blue',
                    'stroke-width': 2
                }),



        line1  = draw.line(19, 127, 252, 386)
                .attr({
                    stroke        : 'blueviolet',
                    'stroke-width': 2
                }),
        line2  = draw.line(140, 45, 18, 250)
                .attr({
                    stroke        : 'darkorange',
                    'stroke-width': 2
                });

    var spiralCurvePoints = spiral.intersectsPath(curve, 10),
        spiralLine1Points = spiral.intersectsLine(line1, 30),
        line1Line2Point   = line1.intersectsLine(line2),
        curveLine2Points  = SVGIntersections.path_linePos(curve, SVGIntersections.fromLineToLinePos(line2));

    console.log('spiralCurvePoints: ', spiralCurvePoints);
    console.log('line1Line2Point: ', line1Line2Point);

    spiralCurvePoints.forEach(function(point){
        _drawTestPoint(point);
    });

    spiralLine1Points.forEach(function(point){
        _drawTestPoint(point);
    });

    line1Line2Point && _drawTestPoint(line1Line2Point);

    curveLine2Points.forEach(function(point){
        _drawTestPoint(point);
    });

    function _drawTestPoint(point, color, radius){
        color  = color || 'red';
        radius = radius || 5;
        draw.circle(radius).move(point.x - radius / 2, point.y - radius / 2).attr({'fill': color});
    }
