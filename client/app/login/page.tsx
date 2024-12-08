"use client"
import { signIn } from "next-auth/react"
 
export default function Login() {
  return (
    <button type="submit" onClick={() => signIn("github", { callbackUrl: '/home' })}>Sign in with GitHub</button>
  )
} 