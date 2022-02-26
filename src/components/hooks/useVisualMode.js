import { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const modes = [mode];
  console.log('here')

  const transition = (newMode) => {
    setMode(newMode);
    console.log('mode')
  }

  return { mode }
}