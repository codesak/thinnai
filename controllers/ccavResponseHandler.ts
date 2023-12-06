import { Request, Response } from 'express';
import qs from 'querystring';
import * as ccav from '../utils/ccavutil';

export function postRes(request: Request, response: Response): void {
  let ccavEncResponse = '',
    ccavResponse = '',
    workingKey = '1CB1E23CBFD880D5A304F9E7C4A76DAF', //Put in the 32-Bit key shared by CCAvenues.
    ccavPOST: qs.ParsedUrlQuery = {};

  request.on('data', function (data) {
    ccavEncResponse += data;
    ccavPOST = qs.parse(ccavEncResponse);
    const encryption = ccavPOST.encResp;
    if (typeof encryption === 'string') {
        ccavResponse = ccav.decrypt(encryption, workingKey);
      }
  });

  request.on('end', function () {
    let pData = '';
    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
    pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
    pData = pData.replace(/&/gi, '</td></tr><tr><td>')
    pData = pData + '</td></tr></table>'
    const htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(htmlcode);
    response.end();
  });
};