import {useContext} from 'react'
import {ButtonContext} from '../../../../App'
import {ICONS} from '../../../../constants'

function useHandleRightButton(){
    const {setSelectedIcon} = useContext(ButtonContext)

    function handleRightButton(){

        setSelectedIcon((prev: number) => prev ===  ICONS.length -1 ? 0   : prev +1  )


    }
    return{handleRightButton}
}

export {useHandleRightButton}
