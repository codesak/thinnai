import { createCipheriv, createDecipheriv, createHash } from 'crypto'

// const CURRENT_VERSION = '1.1'
enum OrderStatus {
  Failure = 'Failure',
  Success = 'Success',
  Aborted = 'Aborted',
  Invalid = 'Invalid',
  Timeout = 'Timeout',
}

enum PaymentMode {
  IVRS = 'IVRS',
  EMI = 'EMI',
  UPI = 'UPI',
  Wallet = 'Wallet',
  CreditCard = 'Credit Card',
  NetBanking = 'Net banking',
  DebitCard = 'Debit Card',
  Cash = 'Cash Card',
}

interface IOrderParams {
  order_id: number | string
  currency: string
  amount: number
  language: string
  redirect_url: string
  cancel_url: string
  billing_name?: string
  billing_address?: string
  billing_city?: string
  billing_state?: string
  billing_zip?: number
  billing_country?: string
  billing_tel?: string
  billing_email?: string
  integration_type: string
  merchant_param1?: string
  merchant_param2?: string
  merchant_param3?: string
  merchant_param4?: string
}
interface IGenericParams {
  access_code: string
  workingKey: string
  command: string
  request_type: string // XML, JSON or String formats
  response_type: string // XML, JSON or String formats
  version: string
  dataToBeEnCrypted: Object
}

export interface IResponse {
  order_id: string
  tracking_id: string
  bank_ref_no: string
  order_status: OrderStatus
  failure_message: string
  payment_mode: PaymentMode
  card_name: string
  status_code: string
  status_message: string
  currency: string
  amount: string
  [key: string]: string
}

interface IOptions {
  merchantId: string
  workingKey: string
}

class Configure {
  private initOptions: IOptions
  constructor(options: IOptions) {
    this.initOptions = options || {}
  }

  public encrypt(plainText: string) {
    console.log(
      '🚀 ~ file: ccAvenue.ts:81 ~ Configure ~ encrypt ~ plainText:',
      plainText
    )
    try {
      if (!plainText) throw new Error('Plain text not found')
      if (!this.initOptions.workingKey) {
        throw new Error('No Working Key found')
      }
      const workingKey = this.initOptions.workingKey
      const m = createHash('md5')
      m.update(workingKey)
      const key = m.digest()
      const iv =
        '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
      const cipher = createCipheriv('aes-128-cbc', key, iv)
      let encoded = cipher.update(plainText, 'utf8', 'hex')
      encoded += cipher.final('hex')
      return encoded
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public static encryption(plainText: string, workingKey: string) {
    console.log(
      '🚀 ~ file: ccAvenue.ts:102 ~ Configure ~ encryption ~ plainText:',
      plainText
    )
    try {
      if (!plainText) throw new Error('Plain text not found')
      if (!workingKey) {
        throw new Error('No Working Key found')
      }
      const m = createHash('md5')
      m.update(workingKey)
      const key = m.digest()
      const iv =
        '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
      const cipher = createCipheriv('aes-128-cbc', key, iv)
      let encoded = cipher.update(plainText, 'utf8', 'hex')
      encoded += cipher.final('hex')
      return encoded
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public decrypt(encText: any) {
    try {
      if (!encText) throw new Error('Encrypted text not found')
      if (!this.initOptions.workingKey) {
        throw new Error('No Working Key found')
      }
      const workingKey = this.initOptions.workingKey
      const m = createHash('md5')
      m.update(workingKey)
      const key = m.digest()
      const iv =
        '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
      const decipher = createDecipheriv('aes-128-cbc', key, iv)
      let decoded = decipher.update(encText, 'hex', 'utf8')
      decoded += decipher.final('utf8')
      return decoded
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public static decryption(encText: any, workingKey: string) {
    try {
      if (!encText) throw new Error('Encrypted text not found')
      if (!workingKey) {
        throw new Error('No Working Key found')
      }
      const m = createHash('md5')
      m.update(workingKey)
      const key = m.digest()
      const iv =
        '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
      const decipher = createDecipheriv('aes-128-cbc', key, iv)
      let decoded = decipher.update(encText, 'hex', 'utf8')
      decoded += decipher.final('utf8')
      return decoded
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public getEncryptedOrder(orderParams: IOrderParams) {
    try {
      if (!orderParams) throw new Error('Order params not found')
      if (!this.initOptions.merchantId) {
        throw new Error('Merchant ID not found')
      }
      let data = `merchant_id=${this.initOptions.merchantId}`
      data += Object.entries(orderParams)
        .map(([key, value]) => `&${key}=${value}`)
        .join('')

      return this.encrypt(data)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public static getEncryptedParams(genericParams: IGenericParams) {
    try {
      // const merchant_data = JSON.stringify(post_data);
      // const encrypted_data = this.encrypt(merchant_data, this.working_key);
      // const command = "orderStatusTracker";

      if (!genericParams) throw new Error('Order params not found')
      // if (!this.initOptions.merchantId) {
      //   throw new Error('Merchant ID not found')
      // }
      // let data = `merchant_id=${this.initOptions.merchantId}`
      let data = ``
      // data += Object.entries(genericParams.dataToBeEnCrypted)
      //   .map(([key, value]) => `&${key}=${value}`)
      //   .join('')
      data = JSON.stringify(genericParams.dataToBeEnCrypted)
      console.log(
        '🚀 ~ file: ccAvenue.ts:194 ~ Configure ~ getEncryptedParams ~ data:',
        data
      )
      const workingKey = genericParams.workingKey
      const encrypted_data = Configure.encryption(data, workingKey)
      const final_data = `request_type=JSON&access_code=${genericParams.access_code}&command=${genericParams.command}&response_type=JSON&version=${genericParams.version}&enc_request=${encrypted_data}`
      return final_data
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public convertResponseToJSON(encryptedResponse: string): IResponse {
    try {
      if (!encryptedResponse) {
        throw new Error('CCavenue response not found')
      }
      const ccavResponse: string = this.decrypt(encryptedResponse)
      const responseArray = ccavResponse.split('&')
      const stringify = JSON.stringify(responseArray)
      const removeBracket = stringify.replace(/[[\]]/g, '')
      // console.log(removeBracket);
      const removeQuotes = removeBracket.replace(/['"]+/g, '')
      // console.log("\n", removeQuotes, "\n");
      return removeQuotes.split(',').reduce((obj, pair: string) => {
        const _pair: string[] = pair.split('=')
        return (obj[_pair[0]] = _pair[1]), obj
      }, {} as IResponse)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public static decryptAndConvertToJSON(
    encryptedResponse: string,
    workingKey: string
  ) {
    try {
      if (!encryptedResponse) {
        throw new Error('CCavenue response not found')
      }
      console.log(
        '🚀 ~ file: ccAvenue.ts:243 ~ Configure ~ encryptedResponse:',
        encryptedResponse
      )

      const ccavResponse: string = Configure.decryption(
        encryptedResponse,
        workingKey
      )
      console.log(
        '🚀 ~ file: ccAvenue.ts:249 ~ Configure ~ ccavResponse:',
        ccavResponse
      )
      const responseArray = ccavResponse.split('&')
      const stringify = JSON.stringify(responseArray)
      const removeBracket = stringify.replace(/[[\]]/g, '')
      // console.log(removeBracket);
      const removeQuotes = removeBracket.replace(/['"]+/g, '')
      // console.log("\n", removeQuotes, "\n");
      return removeQuotes.split(',').reduce((obj, pair: string) => {
        const _pair: string[] = pair.split('=')
        return (obj[_pair[0]] = _pair[1]), obj
      }, {} as IResponse)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default { Configure }
