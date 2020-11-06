import React, {createContext} from 'react'
import './App.css'
import {ButtonsContainer} from './components/buttons/ButtonsContainer'
import {Modal} from './components/modal/Modal'
import {Icons} from './components/icons/Icons'
import {useGameLogic} from './hooks/gameLogic'



export const  ButtonContext = createContext<any>(undefined)

function ButtonsProvider(props: any){
    return(
        <ButtonContext.Provider {...props}/>
        )
}
function App() {
    const {
        modScene,
        modFox,
        showPoopBag,
        modalText,
        actions,
        setSelectedIcon,
        current,
        selectedIcon
    } = useGameLogic()

    return (
        <div className="container">
            <div className="inner">
                <div className={`game ${modScene}`}/>
                <div className={`fox ${modFox}`}/>
                <div className={`poop-bag ${showPoopBag ? '' : 'hidden'}`}/>
                <div className="foreground-rain"/>
                <div className="frame"/>
                <Modal text={modalText}/>
                <ButtonsProvider value={{actions,setSelectedIcon, current,selectedIcon}}>
                    <ButtonsContainer />
                </ButtonsProvider>
                <Icons selectedIcon={selectedIcon}/>
            </div>
        </div>
    )
}

export default App
