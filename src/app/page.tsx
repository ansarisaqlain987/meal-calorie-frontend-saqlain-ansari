import { redirect } from "next/navigation";

export function Page() {
  redirect("/sign-in");
  return <></>;
}
