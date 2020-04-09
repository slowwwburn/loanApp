import db from '../src/models'
import axios from 'axios'
import Util from '../utils/Utils'

const util = new Util()

const mode = process.env.REMITA_MODE;

let merchantId, apikey, apiToken, baseURL, Host, url, params, options

if (mode === "demo") {
  merchantId = process.env.DEMO_MERCHANT_ID;
  apikey = process.env.DEMO_APIKEY;
  apiToken = process.env.DEMO_APITOKEN;
  baseURL = "https://remitademo.net"
  Host = 'remitademo.net'
} else if (mode === "prod") {
  merchantId = process.env.LIVE_MERCHANT_ID;
  apikey = process.env.LIVE_APIKEY;
  apiToken = process.env.LIVE_APITOKEN;
  baseURL = "https://login.remita.net"
  Host = 'login.remita.net'
}

class RemitaService {
  static async getSalaryHistory(phoneNumber, authorisationChannel) {
    const d = new Date();
    const requestId = d.getTime();
    const authorisationCode = Math.floor(Math.random() * 1101233);
    const apiHash = util.cryptoHash(apikey + requestId + apiToken);
    const authorization = "remitaConsumerKey=" + apikey + ", remitaConsumerToken=" + apiHash;
    url = `${baseURL}/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/salary/history/ph`;
    params = {
      authorisationCode,
      phoneNumber,
      authorisationChannel,
      json: true
    };
    options = {
      headers: {
        Connection: 'keep-alive',
        Host,
        Accept: '*/*',
        Authorization: authorization,
        Request_Id: requestId.toString(),
        Merchant_Id: merchantId,
        Api_Key: apikey,
        'Content-Type': 'application/json'
      },
      json: true
    };
    try {
      const result = await axios.post(url, params, options)
      result.data.data.authorisationCode = authorisationCode
      return result.data
    } catch (err) { throw err };
  }

  static async setUpMandate(customer, details) {
      if (details.type == "DD") {
        const d = new Date();
        const requestId = d.getTime();
        url = `${baseURL}/remita/exapp/api/v1/send/api/echannelsvc/echannel/mandate/setup`
        const { name, email, phone, bankCode, account } = customer
        const { amount, start, end, type, maxNoOfDebits } = details
        var hash = util.cryptoHash(merchantId + serviceTypeId + requestId + amount + apiKey);
        params = {
          merchantId,
          serviceTypeId,
          hash,
          payerName: name,
          payerEmail: email,
          payerPhone: phone,
          payerAccount: account,
          payerBankCode: bankCode,
          requestId,
          amount,
          startDate: start,
          endDate: end,
          mandateType: type,
          frequency: freq,
          maxNoOfDebits
        }
        options = {
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cache-Control": "no-cache"
          },
          json: true
        }
      }
      else if (details.type == "SO") {
        const d = new Date();
        const requestId = d.getTime();
        url = `${baseURL}/remita/exapp/api/v1/send/api/echannelsvc/echannel/mandate/setup`
        const { name, email, phone, bankCode, account } = customer
        const { amount, start, end, type, freq } = details
        var hash = util.cryptoHash(merchantId + serviceTypeId + requestId + amount + apiKey);
        params = {
          merchantId,
          serviceTypeId,
          hash,
          payerName: name,
          payerEmail: email,
          payerPhone: phone,
          payerBankCode: bankCode,
          payerAccount: account,
          requestId,
          amount,
          startDate: start,
          endDate: end,
          mandateType: type,
          frequency: freq
        }
        options = {
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cache-Control": "no-cache"
          },
          json: true
        }
      }
      else if (details.type == "DF" && customer.authorisationCode) {
        const d = new Date();
        const requestId = d.getTime();
        url = `${baseURL}/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/post/loan`;
        const apiHash = util.cryptoHash(apikey + requestId + apiToken);
        const authorization = `remitaConsumerKey=${apikey},remitaConsumerToken=${apiHash}`;
        const { authorisationCode, phoneNumber, customerId, accountNumber, bankCode } = customer;
        let { loanAmount, collectionAmount, dateOfDisbursement, dateOfCollection, totalCollectionAmount, numberOfRepayments } = details;
        let dd = dateOfDisbursement.split('-');
        let cc = dateOfCollection.split('-');
        // dateOfDisbursement = `${dd[2]}-${dd[1]}-${dd[0]} 00:00:00+0000`;
        // dateOfCollection = `${cc[2]}-${cc[1]}-${cc[0]} 00:00:00+0000`;
        params = {
          customerId,
          authorisationCode,
          authorisationChannel: "USSD",
          phoneNumber,
          accountNumber,
          currency: "NGN",
          loanAmount,
          collectionAmount,
          dateOfDisbursement,
          dateOfCollection,
          totalCollectionAmount,
          numberOfRepayments,
          bankCode,
          json: true
        };
        options = {
          headers: {
            Connection: 'keep-alive',
            Host,
            Accept: '*/*',
            API_KEY: apikey,
            MERCHANT_ID: merchantId,
            REQUEST_ID: requestId,
            AUTHORIZATION: authorization,
            'Content-Type': 'application/json'
          },
          json: true
        };
      }
    try {
      const result = await axios.post(url, params, options)
      result.data.type = details.type
      return result.data
    } catch (err) { throw err };
  }

  static async stopMandate(mandate) {
    if (mandate.requestId && !mandate.authorisationCode) {
      const { mandateId, requestId } = mandate
      const hash = util.cryptoHash(mandateId + merchantId + requestId + apiKey)
      url = `${baseURL}/remita/exapp/api/v1/send/api/echannelsvc/echannel/mandate/stop`
      params = {
        merchantId,
        hash,
        mandateId,
        requestId
      }
      options = {
        headers: {
          "Content-Type": "application/json"
        },
        json: true
      }
    }
    else if (!mandate.requestId && mandate.authorisationCode) {
      const d = new Date();
      const requestId = d.getTime();
      const apiHash = util.cryptoHash(apikey + requestId + apiToken);
      const authorization = `remitaConsumerKey=${apikey},remitaConsumerToken=${apiHash}`;
      const { authorisationCode, customerId, mandateReference } = mandate;
      url = `${baseURL}/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/stop/loan`;
      params = {
        authorisationCode,
        customerId,
        mandateReference,
        json: true
      };
      options = {
        headers: {
          Connection: 'keep-alive',
          Host,
          Accept: '*/*',
          Authorization: authorization,
          Request_Id: requestId.toString(),
          Merchant_Id: merchantId,
          Api_Key: apikey,
          'Content-Type': 'application/json'
        },
        json: true
      };
    }
    try {
      const result = await axios.post(url, params, options)
      return result.data
    } catch (err) { throw err }
  }
}

module.exports = RemitaService