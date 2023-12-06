import { ErrorCode, errorWrapper } from '../utils/consts'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

const localPassportLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  if (!email || !password)
    return res
      .status(ErrorCode.HTTP_NOT_AUTH)
      .json(errorWrapper('Please Enter Details'))

  try {
    const user = (await new Promise((resolve, reject) => {
      passport.authenticate('local', (err: any, user: any) =>
        err ? reject(err) : resolve(user)
      )(req, res, next)
    })) as any
    console.log('🚀 ~ file: localPassprtLogin.ts:19 ~ user ~ user:', user)

    req.user = user
    next()
  } catch (err) {
    return res
      .status(ErrorCode.HTTP_NOT_AUTH)
      .json(errorWrapper('Login Failed!'))
  }
}

export default localPassportLogin
