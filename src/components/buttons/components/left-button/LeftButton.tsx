import React from 'react'
import {useHandleLeftButton} from './handleLeftButton'


function LeftButton() {
    const {handleLeftButton} = useHandleLeftButton()
    return <button className="btn left-btn" onClick={handleLeftButton}/>

}

export {LeftButton}
