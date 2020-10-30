import React from 'react';

export default function ImageInfo(props) {

    return (
        <div className="image_info">
            <div>{props.name}</div>
            <div>{props.info.dimensions[0] + "x" + props.info.dimensions[1]}</div>
            <div>{Math.round(props.info.filesize / 1024) + " KB"}</div>
        </div>
    )
}
