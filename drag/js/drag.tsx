import React, { useState, useEffect } from "react";
import "./style.less";

interface DragState {
    offsetX: number;
    offsetY: number;
}

let mouseDown = false;
let mouseDownPosition = {
    clientX: 0,
    clientY: 0
};
let lastOffset = {
    offsetX: 0,
    offsetY: 0
};

const initialPosition = {
    offsetX: 222,
    offsetY: 93
};

export default function Drag({
    children,
    show = true
}: {
    children: React.ReactChild;
    show: boolean;
}) {
    let [state, changeState] = useState<DragState>({
        offsetX: 0,
        offsetY: 0
    });

    useEffect(() => {
        const mouseOver = (e: MouseEvent) => {
            if (mouseDown) {
                changeState({
                    ...state,
                    offsetX: e.clientX - mouseDownPosition.clientX + lastOffset.offsetX,
                    offsetY: e.clientY - mouseDownPosition.clientY + lastOffset.offsetY
                });
            }
        };
        const mouseUp = (e: MouseEvent) => {
            mouseDown = false;
        };
        document.addEventListener("mousemove", mouseOver);
        document.addEventListener("mouseup", mouseUp);

        return () => {
            document.removeEventListener("mousemove", mouseOver);
            document.removeEventListener("mouseup", mouseUp);
        };
    }, []);

    return (
        <div
            className="dragable_FADSF"
            style={{
                left: state.offsetX + initialPosition.offsetX,
                top: state.offsetY + initialPosition.offsetY,
                display: show ? "block" : "none"
            }}
        >
            <div
                className="drag-pos"
                onMouseDown={e => {
                    mouseDown = true;
                    mouseDownPosition.clientX = e.clientX;
                    mouseDownPosition.clientY = e.clientY;
                }}
                // onMouseMove={e => {
                //   e.stopPropagation();
                //   e.persist();
                //   if (mouseDown && e.clientX) {
                //     e.preventDefault();
                //     // let { offsetX, offsetY } = state;
                //     //   console.log(e.clientX, state.offsetX, e.clientY, state.offsetY);
                //     changeState({
                //       ...state,
                //       offsetX:
                //         e.clientX - mouseDownPosition.clientX + lastOffset.offsetX,
                //       offsetY:
                //         e.clientY - mouseDownPosition.clientY + lastOffset.offsetY
                //     });
                //   }
                // }}
                onMouseUp={() => {
                    mouseDown = false;
                    // mouseDownPosition = {
                    //   clientX: 0,
                    //   clientY: 0
                    // };
                    lastOffset = {
                        offsetX: state.offsetX,
                        offsetY: state.offsetY
                    };
                }}
            // onMouseLeave={() => {
            //   mouseDown = false;
            //   // mouseDownPosition = {
            //   //   clientX: 0,
            //   //   clientY: 0
            //   // };
            //   lastOffset = {
            //     offsetX: state.offsetX,
            //     offsetY: state.offsetY
            //   };
            // }}
            ></div>
            {children}
        </div>
    );
}
