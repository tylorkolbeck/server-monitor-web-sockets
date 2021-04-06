import React from 'react'
import drawCircle from './utilities/canvasLoadAnimation'

export default function Mem({ data }) {
  const { totalMem, usedMem, memUsage, freeMem, memWidgetId } = data

  const canvas = document.querySelector(`.${memWidgetId}`)
  drawCircle(canvas, memUsage * 100)

  return (
    <div className='col-sm-3 cpu'>
      <h3>Memory Usage</h3>
      <div className='canvas-wrapper'>
        <canvas className={memWidgetId} width='200' height='200'></canvas>
        <div className='cpu-text'>{memUsage * 100}%</div>
      </div>
      <div>
        <strong>Total Memory:</strong> {((totalMem / 1073741824) * 100) / 100}gb
      </div>
      <div>
        <strong>Free Memory:</strong>{' '}
        {(((freeMem / 1073741824) * 100) / 100).toFixed(2)}gb
      </div>
    </div>
  )
}
