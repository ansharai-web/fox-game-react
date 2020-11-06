import {useEffect, useState} from 'react'
import {
    DAY_LENGTH,
    getNextDieTime,
    getNextHungerTime,
    getNextPoopTime, NIGHT_LENGTH,
    RAIN_CHANCE,
    SCENES,
    TICK_RATE
} from '../constants'

function useGameLogic() {
    const [gameState, setGameState] = useState({
        current: 'INIT',
        modFox: 'hidden',
        modScene: 'day',
        scene: 0,
        clock: 1,
        wakeTime: -1,
        sleepTime: -1,
        hungryTime: -1,
        timeToStartCelebrating: -1,
        timeToEndCelebrating: -1,
        poopTime: -1,
        dieTime: -1
    })
    const {current, modFox, modScene, clock, wakeTime, sleepTime, hungryTime, timeToStartCelebrating, timeToEndCelebrating, poopTime, dieTime, scene} = gameState
    const [nextTimeToTick, setNextTimeToTick] = useState(Date.now())
    const [selectedIcon, setSelectedIcon] = useState(0)
    const [showPoopBag, setShowPoopBag] = useState(false)
    const [modalText, setModalText] = useState('Press the middle button to start')

    function nextAnimationFrame() {
        const now = Date.now()
        if (nextTimeToTick <= now) {
            tick()
            setNextTimeToTick(now + TICK_RATE)
        }
    }

    useEffect(() => {
        if (current !== 'DEAD') {
            const gameInterval = setInterval(() => {
                requestAnimationFrame(nextAnimationFrame)
            }, 1000)
            return () =>
                clearInterval(gameInterval)
        }
    })

    function tick() {
        switch (clock) {
            case wakeTime:
                wake()
                break
            case sleepTime:
                sleep()
                break
            case hungryTime:
                getHungry()
                break
            case timeToStartCelebrating:
                setGameState((oldGameState) => ({...oldGameState, ...startCelebrating(oldGameState.clock)}))
                break
            case timeToEndCelebrating:
                setGameState((oldGameState) => ({...oldGameState, ...endCelebrating()}))
                break
            case poopTime:
                poop()
                break
            case dieTime:
                die()
                break
        }
        setGameState((oldGameState) => ({...oldGameState, clock: oldGameState.clock + 1}))
    }

    function startGame() {
        setGameState((oldGameState) => ({
            ...oldGameState,
            current: 'HATCHING',
            wakeTime: oldGameState.clock + 3,
            modScene: 'day',
            modFox: 'fox-egg '
        }))
        setModalText('')
    }

    function wake() {
        const scene = Math.random() > RAIN_CHANCE ? 0 : 1
        setGameState((oldGameState) => ({
            ...oldGameState,
            current: 'IDLING',
            wakeTime: -1,
            modFox: SCENES[scene] === 'rain' ? 'fox-rain' : 'fox-idling',
            modScene: SCENES[scene],
            sleepTime: oldGameState.clock + DAY_LENGTH,
            hungryTime: getNextHungerTime(oldGameState.clock)
        }))
    }


    function changeWeather() {
        const newScene = (1 + scene) % SCENES.length
        setGameState((oldGameState) => ({
            ...oldGameState,
            scene: newScene,
            modScene: SCENES[newScene],
            modFox: SCENES[newScene] === 'rain' ? 'fox-rain' : 'fox-idling'

        }))
    }

    function cleanUpPoop() {
        if (current === 'POOPING') {
            setGameState((oldGameState) => ({
                ...oldGameState,
                dieTime: -1,
                hungryTime: getNextHungerTime(oldGameState.clock),
                ...startCelebrating(oldGameState.clock)
            }))
            setShowPoopBag(true)


        }
    }

    function poop() {
        setGameState((oldGameState) => ({
            ...oldGameState,
            current: 'POOPING',
            poopTime: -1,
            modFox: 'fox-pooping',
            dieTime: getNextDieTime(oldGameState.clock)
        }))


    }

    function feed() {
        // can only feed when hungry
        if (current !== 'HUNGRY') {
            return
        }
        setGameState((oldGameState) => ({
            ...oldGameState,
            current: 'FEEDING',
            dieTime: -1,
            poopTime: getNextPoopTime(oldGameState.clock),
            modFox: 'fox-eating',
            timeToStartCelebrating: oldGameState.clock + 2

        }))
    }

    function startCelebrating(clock: number) {
        return {
            current: 'CELEBRATING',
            modFox: 'fox-celebrate',
            timeToStartCelebrating: -1,
            timeToEndCelebrating: clock + 2
        }
    }

    function endCelebrating() {
        setShowPoopBag(false)
        return {
            timeToEndCelebrating: -1,
            current: 'IDLING',
            modFox: SCENES[scene] === 'rain' ? 'fox-rain' : 'fox-idling'
        }

    }


    function clearTimes() {
        return {
            wakeTime: -1,
            sleepTime: -1,
            hungryTime: -1,
            dieTime: -1,
            poopTime: -1,
            timeToStartCelebrating: -1,
            timeToEndCelebrating: -1

        }
    }

    function sleep() {
        setGameState((oldGameState) => ({
            ...oldGameState,
            current: 'SLEEP',
            modFox: 'fox-sleep',
            modScene: 'night',
            ...clearTimes(),
            wakeTime: oldGameState.clock + NIGHT_LENGTH
        }))
    }

    function getHungry() {
        setGameState((oldGameState) => ({
            ...oldGameState,
            current: 'HUNGRY',
            dieTime: getNextDieTime(oldGameState.clock),
            hungryTime: -1,
            modFox: 'fox-hungry'
        }))
    }

    function die() {
        setGameState((oldGameState) => ({
            ...oldGameState,
            current: 'DEAD',
            modScene: 'dead',
            modFox: 'fox-dead',
            ...clearTimes()
        }))
        setModalText(`The fox died, press the middle button to start`)

    }

    return {
        modScene,
        modFox,
        showPoopBag,
        modalText,
        actions: {changeWeather, cleanUpPoop, feed, startGame},
        setSelectedIcon,
        current,
        selectedIcon
    }

}

export {useGameLogic}
