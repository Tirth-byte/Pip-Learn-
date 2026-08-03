import { moduleIds } from "@/lib/static-params";

export function generateStaticParams() {
  return moduleIds.map((module) => ({ module }));
}

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
