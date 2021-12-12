import React from "react";

export function toArray(pos) {
    return [
        Number.parseFloat(pos.lat),
        Number.parseFloat(pos.long)
    ];
}

export const PathDrawer = ({
                               mapState: {width, height},
                               latLngToPixel,
                               kidsPaths,
                               style = {strokeWidth: 5}
                           }) => {


    function getPath(path) {
        if (path.length < 2) {
            return null;
        }

        let lines = []
        let pixel = latLngToPixel(toArray(path[0]))

        lines.push(<circle cx={pixel[0]} cy={pixel[1]}
                           r={style.strokeWidth}
                           fill={path[0].color}/>)

        for (let i = 1; i < path.length; i++) {
            let pixel2 = latLngToPixel(toArray(path[i]))
            lines.push(<line
                key={i}
                x1={pixel[0]}
                y1={pixel[1]}
                x2={pixel2[0]}
                y2={pixel2[1]}
                style={
                    {
                        stroke: path[i].color,
                        strokeWidth: 5
                    }
                }
            />)
            lines.push(<circle cx={pixel2[0]} cy={pixel2[1]}
                               r={style.strokeWidth}
                               fill={path[i].color}/>)
            pixel = pixel2
        }
        return lines
    }

    return (
        <svg width={width} height={height}
             style={{top: 0, left: 0}}
        >
            {kidsPaths.map(kidPath => getPath(kidPath))}
        </svg>
    )
}