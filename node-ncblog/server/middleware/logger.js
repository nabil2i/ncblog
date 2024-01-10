const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')


const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    const logsDirectory = path.join(__dirname, '../..', 'logs')
    // if (!fs.existsSync(logsDirectory)) {
    // }
    await fsPromises.mkdir(logsDirectory, { recursive: true })
    await fsPromises.appendFile(
      path.join(logsDirectory, logFileName), logItem
    )
    // console.log('Log appended successfully.');
  } catch (error) {
    console.log(error)
  }
}

module.exports = { logEvents, logger }
