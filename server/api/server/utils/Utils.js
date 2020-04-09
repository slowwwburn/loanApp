const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const CryptoJS = require('crypto-js')

dotenv.config();

const saltRounds = Number(process.env.saltRounds)
const jwtSecret = process.env.jwtSecret
const tokenExpireTime = process.env.tokenExpireTime

class Util {
  constructor() {
    this.statusCode = null
    this.type = null
    this.data = null
    this.message = null
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
    this.type = 'true'
  }

  setError(statusCode, message) {
    this.statusCode = statusCode
    this.message = message
    this.type = 'error'
  }

  send(res) {
    const result = {
      status: this.statusCode,
      data: this.data,
      success: this.type,
      message: this.message,
    }

    if (this.type === 'true') {
      return res.status(this.statusCode).json(result)
    }


    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message
    })
  }

  hashPassword(password) {
    try {
      return bcrypt.hashSync(password, saltRounds)
    } catch (err) { throw err }
  }

  comparePassword(password, passwordHash) {
    try {
      const result = bcrypt.compareSync(password || '', passwordHash)
      return result
    } catch (err) { throw err }
  }

  generateToken(params) {
    try {
      const token = jwt.sign(params, jwtSecret, { expiresIn: tokenExpireTime })
      return token
    } catch (err) { throw err }
  }

  verifyToken(token) {
    try {
      const verify = jwt.verify(token, jwtSecret);
      // console.log(verify)
      return verify
    } catch (err) { throw err }
  }

  cryptoHash(params) {
    return CryptoJS.SHA512(params)
  }

  getMandates(mandates, type) {
    var retrieved = []
    mandates.forEach(mandate => {
      // console.log(mandate)
      const startDate = new Date(mandate.startDate + "UTC");
      const values = {
        reference: mandate.reference,
        startDate,
        type
      }
      // console.log(values)
      retrieved.push(values)
    })
    if(!retrieved) return 
    else return retrieved
  }
}

module.exports = Util