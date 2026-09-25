/**
 * Renders JSON-LD structured data as an inline <script> in a page.
 * Server component — safe to use in any RSC route.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}