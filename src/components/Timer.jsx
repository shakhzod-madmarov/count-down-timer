import { useState, useEffect } from 'react'

import './Timer.css'

const Timer = () => {
  const [duration, setDuration] = useState()
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (duration <= 0) {
      setSeconds(0)
      setIsRunning(false)
      return
    }

    let interval = null

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval)
            setIsRunning(false)
            return 0
          }
          return prevSeconds - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [duration, isRunning])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    const inputDuration = parseInt(value, 10)
    setDuration(inputDuration)
    setSeconds(inputDuration)
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const inpTime = <input value={duration} onChange={handleInputChange} className="inpTime" />

  return (
    <div className="timer">
      <p>Set Meditation for {inpTime} seconds</p>
      <h1 className="seconds">{formatTime(seconds)}</h1>
      <button onClick={handleStart} className="btnStart">
        Start
      </button>
    </div>
  )
}

export default Timer
