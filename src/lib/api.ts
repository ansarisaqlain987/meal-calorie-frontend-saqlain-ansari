"use server";
import { Constants } from "@/config/constants";
import { LoginResponse, RegisterResponse, SearchResult } from "@/types";

export async function login(body: { email: string; password: string }) {
  const url = `${Constants.API_URL}/auth/login`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const resBody: LoginResponse = await resp.json();
  return resBody;
}

export async function register(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const url = `${Constants.API_URL}/auth/register`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resBody: RegisterResponse = await resp.json();
  return resBody;
}

export async function searchDish(
  body: { dish: string; serving: number },
  token: string
) {
  const url = `${Constants.API_URL}/search`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (resp.status !== 200) return [];
  const resBody = await resp.json();
  return resBody.data as SearchResult[];
}
