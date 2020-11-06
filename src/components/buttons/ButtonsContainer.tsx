import React from 'react'
import {LeftButton} from './components/left-button/LeftButton'
import {MiddleButton} from './components/center-button/MiddleButton'
import {RightButton} from './components/right-button/RightButton'

function ButtonsContainer(){
        return(
            <div className='buttons'>
                <LeftButton />
                <MiddleButton/>
                <RightButton />
            </div>
        )
}

export {ButtonsContainer}
