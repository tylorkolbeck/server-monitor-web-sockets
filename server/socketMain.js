const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/perfData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const Machine = require('./models/Machine')

function socketMain(io, socket) {
  let macA

  socket.on('clientAuth', (key) => {
    if (key === 'asdf7342griasdf43') {
      // valid nodeClient
      socket.join('clients')
    } else if (key === 'afsdf32fkjlj') {
      // valid UI client has joined
      socket.join('ui')
      console.log('React client joined')
      Machine.find({}, (err, docs) => {
        docs.forEach((aMachine) => {
          // onload assume all machines are offline
          aMachine.isActive = false
          io.to('ui').emit('data', aMachine)
        })
      })
    } else {
      // an invaluid client has joined
      socket.disconnect(true)
    }
  })

  socket.on('disconnect', () => {
    Machine.find({ macA: macA }, (err, docs) => {
      if (docs.length > 0) {
        docs[0].isActive = false
        io.to('ui').emit('data', docs[0])
      }
    })
  })

  // check to see if this is a new machine if it is add it to the DB
  socket.on('initPerfData', async (data) => {
    // update function scoped variable
    macA = data.macA

    // check mongo
    const mongooseResponse = await checkAndAdd(data)
    console.log(mongooseResponse)
  })

  socket.on('perfData', (data) => {
    console.log('Tick...')
    io.to('ui').emit('data', data)
  })
}

function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        reject(err)
      } else if (doc === null) {
        let newMachine = new Machine(data)
        newMachine.save()
        resolve('added')
        console.log('New Machine')
      } else {
        console.log('Machine exists in db')
        resolve('found')
      }
    })
  })
}

module.exports = socketMain
