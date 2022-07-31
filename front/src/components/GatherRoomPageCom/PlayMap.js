import React, { useRef, useEffect } from "react";
export default function PlayMap(props) {
    const size = 700;
    const mapFocus = useRef();
    useEffect(() => {
        mapFocus.current.focus();
    }, []);

    return (
        <div>
            <div
                ref={mapFocus}
                style={{ width: size, height: size, background: "orange" }}
            ></div>
            playMap
        </div>
    );
}
