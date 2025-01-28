import jwt, { JwtPayload } from 'jsonwebtoken';
export const createToken = (
  jwtPayload: JwtPayload,
  token: string,
  expiresIn: string,
): string => {
  return jwt.sign(jwtPayload, token,{ expiresIn});
  
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
