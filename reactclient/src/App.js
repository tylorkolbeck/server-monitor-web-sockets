import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import socket from './utilities/socketConnection'
import Widget from './Widget'

function App() {
  const [perfData, setPerfData] = useState({})

  useEffect(() => {
    socket.on('data', (data) => {
      setPerfData((prevState) => ({
        ...prevState,
        [data.macA]: data
      }))
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <div className='App'>
      {Object.entries(perfData).map(([macA, data]) => (
        <Widget key={macA} data={data} />
      ))}
      {/* <Widget /> */}
    </div>
  )
}

export default App
