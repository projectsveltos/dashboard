import { describe, expect, it } from "vitest";

import {
  getTokenExpiry,
  isTokenExpired,
} from "@/modules/authentication/tokenExpiry";

// Encodes the JSON as UTF-8 first, as a JWT does.
const base64url = (value: object) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const makeJwt = (claims: object) =>
  `${base64url({ alg: "RS256", kid: "1" })}.${base64url(claims)}.c2lnbmF0dXJl`;

const nowMs = Date.UTC(2026, 9, 8, 12, 0, 0);
const nowSeconds = nowMs / 1000;

describe("getTokenExpiry", () => {
  it("reads the exp claim of a JWT", () => {
    expect(getTokenExpiry(makeJwt({ exp: nowSeconds + 60 }))).toBe(
      nowSeconds + 60,
    );
  });

  it("reads a payload that is not plain ASCII", () => {
    const token = makeJwt({ name: "Zoë", exp: nowSeconds });
    expect(getTokenExpiry(token)).toBe(nowSeconds);
  });

  it("returns undefined when there is no exp claim", () => {
    expect(getTokenExpiry(makeJwt({ sub: "user-1" }))).toBeUndefined();
  });

  it("returns undefined when exp is not a number", () => {
    expect(getTokenExpiry(makeJwt({ exp: "tomorrow" }))).toBeUndefined();
  });

  it("returns undefined for a token that is not a JWT", () => {
    expect(getTokenExpiry("an-opaque-access-token")).toBeUndefined();
  });

  it("returns undefined for an encrypted token, which has five segments", () => {
    expect(getTokenExpiry("a.b.c.d.e")).toBeUndefined();
  });

  it("returns undefined for a payload that is not JSON", () => {
    expect(getTokenExpiry("aaa.bbb.ccc")).toBeUndefined();
  });
});

describe("isTokenExpired", () => {
  it("is false while the token is valid", () => {
    expect(isTokenExpired(makeJwt({ exp: nowSeconds + 1 }), nowMs)).toBe(false);
  });

  it("is true once the token has expired", () => {
    expect(isTokenExpired(makeJwt({ exp: nowSeconds - 1 }), nowMs)).toBe(true);
  });

  it("is true at the exact expiry time", () => {
    expect(isTokenExpired(makeJwt({ exp: nowSeconds }), nowMs)).toBe(true);
  });

  it("is false when the expiry cannot be read", () => {
    expect(isTokenExpired("an-opaque-access-token", nowMs)).toBe(false);
    expect(isTokenExpired(makeJwt({ sub: "user-1" }), nowMs)).toBe(false);
  });
});
