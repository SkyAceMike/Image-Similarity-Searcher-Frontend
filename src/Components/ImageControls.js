import React from 'react'

export default function ImageControls({name, deleteImage}) {

    return (
        <>
            <button className="image_delete" onClick={() => deleteImage(name)}>DELETE BUTTON</button>
        </>
    )
}
