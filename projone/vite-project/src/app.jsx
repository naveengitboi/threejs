import { useState, useEffect } from 'preact/hooks'
import './app.css'
import * as THREE from 'three'
export function App() {

  useEffect(() => {
  }, [])

  return (
    <div>
      <canvas id='myThreeJsCanvas'></canvas>
    </div>
  )
}
