const winston = require('winston')

const logger1 = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: 'logger.log',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      )
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger1.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

const logHelper = {
  log: logger1.info.bind(logger1),
  error: logger1.error.bind(logger1)
}

exports.logger = logHelper
