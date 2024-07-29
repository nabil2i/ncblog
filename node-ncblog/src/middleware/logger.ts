import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
// import fs from 'fs';
import fsPromises from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Request, Response, NextFunction } from 'express'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}

export const logEvents = async (message: string, logFileName: string) => {
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
