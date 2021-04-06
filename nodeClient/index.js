const os = require('os')

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:8181')

socket.on('connect', () => {
  // console.log('Connected to server')
  // need a way to identify this machine to whoever is concerned
  const nI = os.networkInterfaces()
  let macA

  for (let key in nI) {
    // FOR TESTING - REMOVE IN PRODUCTION
    macA = Math.floor(Math.random() * 3) + 1
    break
    // FOR TESTING - REMOVE IN PRODUCTION
    if (!nI[key][0].internal) {
      macA = nI[key][0].mac
      break
    }
  }

  // client auth with single key value
  socket.emit('clientAuth', 'asdf7342griasdf43')

  performanceData().then((allPerData) => {
    allPerData.macA = macA
    socket.emit('initPerfData', allPerData)
  })

  // start sending data on interval
  let perfDataInterval = setInterval(() => {
    performanceData().then((allPerData) => {
      allPerData.macA = macA

      socket.emit('perfData', allPerData)
    })
  }, 1000)

  socket.on('disconnect', () => {
    clearInterval(perfDataInterval)
  })
})

async function performanceData() {
  return new Promise(async (resolve, reject) => {
    const cpus = os.cpus()
    const freeMem = os.freemem()
    const totalMem = os.totalmem()
    const usedMem = totalMem - freeMem
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100
    const osType = os.type() === 'Darwin' ? 'Mac' : os.type()
    const upTime = os.uptime()
    const cpuModel = cpus[0].model
    const numCores = cpus.length
    const cpuSpeed = cpus[0].speed
    const isActive = true

    const cpuLoad = await getCpuLoad()

    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
      isActive
    })
  })
}

function cpuAverage() {
  const cpus = os.cpus()
  let idleMs = 0
  let totalMs = 0

  cpus.forEach((aCore) => {
    for (type in aCore.times) {
      totalMs += aCore.times[type]
    }

    idleMs += aCore.times.idle
  })

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length
  }
}

function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage()

    setTimeout(() => {
      const end = cpuAverage()
      const idleDifference = end.idle - start.idle
      const totalDifference = end.total - start.total

      // calc the percentage of used CPU
      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference)

      resolve(percentageCpu)
    }, 100)
  })
}
