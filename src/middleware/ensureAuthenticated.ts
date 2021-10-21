import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  //se o token for inválido
  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  //[Bearer, token]
  //desestruturação ignorando o bearer
  const [, token] = authToken.split(" ");

  //verficiar se o token é válido
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}
