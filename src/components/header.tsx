import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex h-16 w-screen items-center justify-center bg-zinc-900">
      <Link href="/">
        <Image
          className=""
          src="/images/logo.png"
          alt="DevelopsToday brand logo"
          width={60}
          height={60}
        />
      </Link>
    </header>
  )
}
