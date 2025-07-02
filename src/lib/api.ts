"use server";
import { Constants } from "@/config/constants";

export async function login(body: { email: string; password: string }) {
  const url = `${Constants.API_URL}/auth/login`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const resBody: {
    success: boolean;
    message?: string;
    data?: {
      token: string;
      user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      };
    };
  } = await resp.json();
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

  return { status: resp.status, data: await resp.json() };
}
