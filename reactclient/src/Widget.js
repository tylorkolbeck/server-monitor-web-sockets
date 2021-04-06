import React, { useState, useEffect } from 'react'
import './widget.css'
import Cpu from './Cpu'
import Mem from './Mem'
import Info from './Info'

export default function Widget({ data }) {
  const [state, setState] = useState()

  const {
    cpuModel,
    cpuLoad,
    cpuSpeed,
    freeMem,
    macA,
    memUsage,
    numCores,
    osType,
    totalMem,
    upTime,
    usedMem,
    isActive
  } = data

  const cpuWidgetId = `cpu-widget-${macA}`
  const memWidgetId = `mem-widget-${macA}`
  const cpu = { cpuLoad, cpuWidgetId }
  const mem = { totalMem, usedMem, memUsage, freeMem, memWidgetId }
  const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed }

  return (
    <div className='widget col-sm-12'>
      {!isActive && <div className='not-active'>Offline</div>}
      <Cpu data={cpu} />
      <Mem data={mem} />
      <Info data={info} />
    </div>
  )
}
