import {useContext} from 'react'
import {ButtonContext} from '../../../../App'
import {ICONS} from '../../../../constants'

function useHandleMiddleButton(){
    const {current,actions:{startGame,changeWeather,cleanUpPoop,feed},selectedIcon} = useContext(ButtonContext)
    function handleMiddleButton() {
        // can't do actions while in these states
        if (['SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(current)) {
            return
        }
        if (current === 'INIT' || current === 'DEAD') {
            startGame()
            return console.log('start game')
        }
        // execute the currently selected action
        switch (ICONS[selectedIcon]) {
            case 'weather':
                changeWeather()
                break
            case 'poop':
                cleanUpPoop()
                break
            case 'fish':
                feed()
                break
        }


    }
    return {
        handleMiddleButton
    }
}
export {useHandleMiddleButton}
