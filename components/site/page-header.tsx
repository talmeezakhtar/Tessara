import Link from "next/link";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Breadcrumb, page title and an optional one-line intro, shared by the info pages. */
export function PageHeader({ title, intro, crumbs = [{ href: "/", label: "Home" }] }: { title: string; intro?: string; crumbs?: { href: string; label: string }[] }) {
  return (
    <header className="pb-8 md:pb-12">
      <nav aria-label="Breadcrumb" className="py-4 text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          {crumbs.map((c) => (
            <li key={c.href} className="flex gap-2">
              <Link href={c.href} className={`hover:text-foreground ${focus}`}>{c.label}</Link><span aria-hidden>/</span>
            </li>
          ))}
          <li aria-current="page" className="text-foreground">{title}</li>
        </ol>
      </nav>
      <h1 className="text-4xl font-medium md:text-6xl">{title}</h1>
      {intro && <p className="mt-3 max-w-[56ch] text-base text-muted-foreground">{intro}</p>}
    </header>
  );
}
