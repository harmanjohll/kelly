// Every internal link goes through here, so the site works at a domain root or under a
// sub path such as GitHub Pages' /kelly/. The base comes from BASE_PATH at build time.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
