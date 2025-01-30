import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
export const createToken = (
  jwtPayload: JwtPayload,
  token: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, token, {
    expiresIn: expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
