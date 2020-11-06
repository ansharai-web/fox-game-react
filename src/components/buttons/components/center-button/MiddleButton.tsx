import React from 'react'
import {useHandleMiddleButton} from './handleMiddleButton'


function MiddleButton() {
    const {handleMiddleButton} = useHandleMiddleButton()

    return <button className="btn middle-btn" onClick={handleMiddleButton}/>
}

export {MiddleButton}
