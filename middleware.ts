import * as jose from "https://deno.land/x/jose@v4.8.1/index.ts";
import {
  InvalidAuthentication,
  MissingAuthentication,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";
import { Request, State } from "https://deno.land/x/oak@v10.6.0/mod.ts";

export async function authenticationHandler(
  { request, state }: {
    request: Request;
    state: State;
  },
  next: () => Promise<unknown>,
): Promise<void> {
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

    state.email = payload.email;
    console.log(state.email);
  } catch (error) {
    console.error(error);
    throw new InvalidAuthentication();
  }

  await next();
}
