import * as jose from "https://deno.land/x/jose@v4.8.1/index.ts";
import { Middleware } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import {
  InvalidAuthentication,
  MissingAuthentication,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";

export const authenticationMiddleware: Middleware = async (
  { request, state },
  next,
) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (typeof token !== "string") {
    throw new MissingAuthentication();
  }

  try {
    const JWKS = jose.createRemoteJWKSet(
      new URL("https://www.googleapis.com/oauth2/v3/certs"),
    );

    const { payload } = await jose.jwtVerify(token, JWKS, {
      issuer: "accounts.google.com",
    });

    state.user = payload;

    await next();
  } catch (error) {
    console.error(error);
    throw new InvalidAuthentication();
  }
};
