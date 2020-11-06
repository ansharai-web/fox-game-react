import React from 'react'
import {useHandleRightButton} from './handleRightButton'


function RightButton() {
    const {handleRightButton} = useHandleRightButton()

    return <button className="btn right-btn" onClick={handleRightButton}/>
}

export {RightButton}
