import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { useEffect } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb component with BreadcrumbList JSON-LD schema injection.
 * Pass items as an ordered array: home → section → current page.
 * The last item is considered the current page (no link rendered).
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://radhamadhavmritshilpalay.in";

  // Inject JSON-LD BreadcrumbList schema
  useEffect(() => {
    const schemaId = "breadcrumb-jsonld";
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
      })),
    };

    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [items, baseUrl]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-muted-foreground ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {/* Always render Home as first item */}
        <li className="flex items-center gap-1">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-primary transition-smooth"
            aria-label="Home"
          >
            <Home size={13} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-1"
          >
            <ChevronRight
              size={12}
              className="text-border"
              aria-hidden="true"
            />
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="hover:text-primary transition-smooth"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="text-foreground font-medium truncate max-w-[180px] sm:max-w-xs"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
