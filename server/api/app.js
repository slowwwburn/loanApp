import express from 'express'
import bodyParser from 'body-parser';
import chalk from 'chalk'
import morgan from 'morgan'
import DDRouter from './server/routes/DDRoutes'
import SORouter from './server/routes/SORoutes'
import DFRouter from './server/routes/DFRoutes'
import UserRouter from './server/routes/UserRoutes'
import RemitaRouter from './server/routes/RemitaRoutes'

const debug = require('debug')('app')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8888

const morganMiddleware = morgan(function (tokens, req, res) {
  let statusColor = tokens.status(req, res) >= 500
    ? '#ff4757' : tokens.status(req, res) >= 400
      ? '#ff4757' : tokens.status(req, res) >= 300
        ? '#1e90ff' : tokens.status(req, res) >= 200
          ? '#00ff00' : null

  let methodColor = tokens.method(req, res) == "DELETE"
    ? '#ff4757' : tokens.method(req, res) == "POST"
      ? '#ffff00' : tokens.method(req, res) == "PUT"
        ? '#1e90ff' : tokens.method(req, res) == "GET"
          ? '#00ff00' : null
  return [
    chalk.hex(methodColor).bold(tokens.method(req, res)),
    chalk.hex('#fffff').bold(tokens.url(req, res)),
    chalk.hex(statusColor).bold(tokens.status(req, res)),
    chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
    '\n',
  ].join(' ');
});

app.use(morganMiddleware);

app.use(express.urlencoded({ extended: true }));

app.use('/api/mandate/direct', DDRouter)
app.use('/api/mandate/stand', SORouter)
app.use('/api/mandate/inflight', DFRouter)
app.use('/api/user', UserRouter)
app.use('/api/remita', RemitaRouter)

// when a random route is inputed
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to this API.'
// }));

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`)
})

export default app