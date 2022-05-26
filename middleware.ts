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
  // We'll transfer every header key to lowercase for easier comparison
  request.headers.forEach((_value, key) => {
    key = key.toLowerCase();
  });
  
  const header = request.headers.get("authorization")
  const token = header?.split(" ")[1];

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
  } catch {
    throw new InvalidAuthentication();
  }

  await next();
}
