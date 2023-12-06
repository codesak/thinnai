/**
 * Enum for error codes
 * @readonly
 * @enum {int}
 */
export const ErrorCode = Object.freeze({
  DB_CONN_ERR: 1,
  HTTP_BAD_REQ: 400,
  HTTP_NOT_AUTH: 401,
  HTTP_FORBIDDEN: 403,
  HTTP_NOT_FOUND: 404,
  HTTP_CONFLICT: 409,
  HTTP_SERVER_ERROR: 500,
})


export const PRICING_HOUR_TYPE_JOY = "joy";

 export const PRICING_HOUR_TYPE_GALA = "gala";

 export const SERVICE_CHARGE_GUEST = 0.095;

 export const SERVICE_CHARGE_HOST = 0.095;

 export const GST_GUEST = 0.18;

 export const GST_HOST = 0.18;

export const errorWrapper = (message: string) => ({ errors: { message } })

export const cleanMap = (obj: { [x: string]: any }) =>
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] === null || obj[k] === undefined || obj[k] === '') &&
      delete obj[k]
  )
