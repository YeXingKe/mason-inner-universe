import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mason-working-time'

interface WorkingTime {
  date: string
  startTime: number
  pauseTime: number
  startPauseTime: number
}

function formatSeconds(seconds: number) {
  let secondTime = Math.floor(seconds % 60)
  let minuteTime = Math.floor(seconds / 60)
  let hourTime = 0
  let dayTime = 0

  if (minuteTime >= 60) {
    hourTime = Math.floor(minuteTime / 60)
    minuteTime = Math.floor(minuteTime % 60)
    if (hourTime >= 24) {
      dayTime = Math.floor(hourTime / 24)
      hourTime = Math.floor(hourTime % 24)
    }
  }

  let result = `${hourTime}小时${minuteTime >= 10 ? minuteTime : `0${minuteTime}`}分${secondTime >= 10 ? secondTime : `0${secondTime}`}秒`
  if (dayTime > 0) result = `${dayTime}天${result}`
  return result
}

function loadWorkingTime(): WorkingTime {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as WorkingTime
  } catch {
    /* ignore */
  }
  return { date: '', startTime: 0, pauseTime: 0, startPauseTime: 0 }
}

function saveWorkingTime(data: WorkingTime) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useWorkingTimer() {
  const [workingTimeFormat, setWorkingTimeFormat] = useState('')
  const [pauseWork, setPauseWork] = useState(false)

  const tick = useCallback(() => {
    const workingTime = loadWorkingTime()
    const currentDate = dayjs().format('YYYY-M-D')
    const now = Math.floor(Date.now() / 1000)

    if (workingTime.date !== currentDate) {
      workingTime.date = currentDate
      workingTime.startTime = now
      workingTime.pauseTime = 0
      workingTime.startPauseTime = 0
      saveWorkingTime(workingTime)
    }

    let startPauseTime = 0
    if (workingTime.startPauseTime > 0) {
      startPauseTime = now - workingTime.startPauseTime
      setPauseWork(true)
    } else {
      setPauseWork(false)
    }

    const workingSeconds = now - workingTime.startTime - workingTime.pauseTime - startPauseTime
    setWorkingTimeFormat(formatSeconds(Math.max(workingSeconds, 0)))
  }, [])

  useEffect(() => {
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [tick, pauseWork])

  const toggleWorkState = useCallback(() => {
    const workingTime = loadWorkingTime()
    const now = Math.floor(Date.now() / 1000)

    if (pauseWork) {
      workingTime.pauseTime += now - workingTime.startPauseTime
      workingTime.startPauseTime = 0
      saveWorkingTime(workingTime)
      setPauseWork(false)
    } else {
      workingTime.startPauseTime = now
      saveWorkingTime(workingTime)
      setPauseWork(true)
    }
  }, [pauseWork])

  return { workingTimeFormat, pauseWork, toggleWorkState }
}
