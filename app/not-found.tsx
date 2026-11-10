import Link from "next/link";
import { Search } from "lucide-react";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Structure p.18: say plainly the page wasn't found, then offer the shop and two common paths.
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[1280px] flex-col items-start justify-center px-4 py-16 md:px-8">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-4xl font-medium md:text-6xl">We can&apos;t find that page</h1>
      <p className="mt-3 max-w-[48ch] text-base text-muted-foreground">The link may be old, or the piece may have sold out and gone from the shop.</p>
      <Link href="/shop" className={`mt-8 inline-flex min-h-12 items-center rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 ${focus}`}>
        Go to the shop
      </Link>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <li><Link href="/new" className={`text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>New in</Link></li>
        <li><Link href="/help" className={`text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>Help</Link></li>
        <li>
          <Link href="/search" className={`inline-flex items-center gap-1.5 text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>
            <Search className="size-3.5" aria-hidden />Search
          </Link>
        </li>
      </ul>
    </main>
  );
}
