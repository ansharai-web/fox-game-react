import React from 'react'

interface IIcons {
    selectedIcon: number
}

function Icons({selectedIcon}: IIcons) {
    return (
        <div className="icons">
            <div className={`icon fish-icon ${selectedIcon === 0 ? 'highlighted' : ''}`}/>
            <div className={`icon poop-icon ${selectedIcon === 1 ? 'highlighted' : ''} `}/>
            <div className={`icon weather-icon ${selectedIcon === 2 ? 'highlighted' : ''}`}/>
        </div>)
}

export {Icons}
