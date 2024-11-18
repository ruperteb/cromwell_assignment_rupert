import { SignJWT, jwtVerify } from "jose";
import { SessionPayload, SessionProperties } from "./definitions";
import { Response, Request } from "express";
import { JOSEError } from "jose/errors";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);
const tokenDuration = 60 * 60 * 1000; // i.e. one hour in seconds

// Function to encrypt the session payload and create a JWT
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

// Function to decrypt a session token and return its payload
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    if (error instanceof JOSEError) {
      console.log("Failed to verify session", error.code);
    }
  }
}

// Function to create a session token and append it to the response as a cookie
export async function createSession(
  { userId, role }: SessionProperties,
  res: Response
) {
  const expiresAt = new Date(Date.now() + tokenDuration);
  const session = await encrypt({ userId, role, expiresAt });

  res.cookie("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// Function to refresh the expiry of an existing session token
export async function updateSession(req: Request, res: Response) {
  const session = req.cookies["session"];
  const payload = await decrypt(session);

  if (!session || !payload) {
    return;
  }

  const expiresAt = new Date(Date.now() + tokenDuration);

  res.cookie("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// Function to clear an existing session cookie
export async function deleteSession(res: Response) {
  // Set the value of the cookie to an empty string and update the expiry to 'now' in the event that the cookie is not removed properly
  res.cookie("session", "", {
    expires: new Date(Date.now()),
  });
  res.clearCookie("session");
}

// Lightweight function to check that a session is valid (without interacting with the database)
// For use in client middleware etc.
export async function verifySession(req: Request) {
  const cookie = req.cookies["session"];
  if (!cookie) {
    return { isAuth: false, userId: undefined, role: undefined };
  }
  const session = (await decrypt(cookie)) as SessionPayload | undefined;

  if (!session?.userId) {
    return { isAuth: false, userId: undefined, role: undefined };
  }

  return { isAuth: true, userId: session.userId, role: session.role };
}
