const cluster = require('cluster')
const os = require('os')

const fork = (num) => {
  const limit = num || os.cpus().length
  for(let i=0; i<limit; i++) {
    const worker = cluster.fork()
  }
}

const run = (mission) => {
  if (cluster.isMaster) {
    console.info('Master run ...')
    cluster.on('exit', (worker, code) => {
      console.error('Worker %d exit (%d), reboot...', worker.id, code)
      fork(1)
    })
    fork()
  }
  if (cluster.isWorker) {
    if (mission && typeof mission === 'function') {
      console.info('Worker run ...')
      mission.call(this)
    } else {
      console.warn('No mission need to run.')
    }
  }
}

module.exports = run
