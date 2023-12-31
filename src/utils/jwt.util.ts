import jwt from "jsonwebtoken";

export async function getLongLivedToken(body: object, expireTime: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const secret: string = "";
      jwt.sign(body, secret, { expiresIn: expireTime }, (err, token) => {
        if (err) reject(err);
        if (token) resolve(token);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

export async function verifyLongLivedToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const secret: string = "";
      jwt.verify(token, secret, (err: any, payload: any) => {
        if (err) reject(err);
        resolve(payload);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}
