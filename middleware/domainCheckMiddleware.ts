import { Request, Response } from 'express'
import { NextFunction } from 'express'

const allowedDomains = [
  'https://secure.ccavenue.com',
  'https://test.ccavenue.com',
]
export const domainCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin

  if (origin && allowedDomains.includes(origin)) {
    next()
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid domain' })
  }
}
