import {useContext} from 'react'
import {ButtonContext} from '../../../../App'
import {ICONS} from '../../../../constants'

function useHandleLeftButton(){
    const {setSelectedIcon} =  useContext(ButtonContext)
    function handleLeftButton(){
        setSelectedIcon((prev: number) => prev === 0 ? ICONS.length -1   : prev - 1 )
    }
    return {handleLeftButton}
}
export {useHandleLeftButton}
