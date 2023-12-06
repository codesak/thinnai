import * as ccav from '../utils/ccavutil'
import { Request, Response } from 'express'
import qs from 'querystring'

//new onesconst workingKey: string = '048BA0E5825575011C9734745BF5A59D'; const accessCode: string = 'AVMJ04KD77AF28JMFA';//Put in the 32-Bit key shared by CCAvenues.

export function postReq(request: Request, response: Response) {
  const workingKey: string = '048BA0E5825575011C9734745BF5A59D' //Put in the 32-Bit key shared by CCAvenues.
  const accessCode: string = 'AVMJ04KD77AF28JMFA' //Put in the Access Code shared by CCAvenues.
  let encRequest: string = ''
  let formbody: string = ''

  const formData = qs.stringify(request.body)
  const addedData = 'merchant_id=2018186&' + formData

  console.log(addedData)
  encRequest = ccav.encrypt(JSON.stringify(formData), workingKey)
  console.log(encRequest)
  formbody =
    '<form  id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"  ref={formRef}/><input type="hidden" id="encRequest" name="encRequest" value="' +
    encRequest +
    '"><input type="hidden" name="access_code" id="access_code" value="' +
    accessCode +
    '"><input type="submit" value="submit"/></form>'
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.write(formbody)
  response.end()
  return
}
