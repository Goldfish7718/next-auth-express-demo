"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession()

  return (
    <>
      <button type="submit" onClick={() => signIn("", { callbackUrl: '/home' })}>Signin</button>
      {session?.user && <button type="submit" onClick={() => signOut()}>Sign Out</button>}
      {session?.user?.name}
    </>
  );
}
