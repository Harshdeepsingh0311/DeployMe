"use client"

import { useState } from "react"
import { Button } from "./ui/button"

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  return (
    <Button
      onClick={handleCopy}
      className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-black transition"
    >
      {copied ? "Copied!" : "Copy Portfolio URL"}
    </Button>
  )
}
