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

  return { status: resp.status, data: await resp.json() };
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
