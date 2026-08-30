/**
 * Resolves static asset URLs (such as Web Workers and public files)
 * ensuring compatibility with Next.js basePath under GitHub Pages and custom subpaths.
 */
export function getAssetPath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // 1. If NEXT_PUBLIC_BASE_PATH is set (e.g., from next.config.ts in GitHub Actions build)
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (envBasePath && !normalizedPath.startsWith(envBasePath)) {
    return `${envBasePath}${normalizedPath}`;
  }

  // 2. Runtime browser fallback for GitHub Pages or subpath hosting
  if (typeof window !== "undefined" && typeof window.location !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/Pip-Learn-") && !normalizedPath.startsWith("/Pip-Learn-")) {
      return `/Pip-Learn-${normalizedPath}`;
    }
  }

  return normalizedPath;
}
