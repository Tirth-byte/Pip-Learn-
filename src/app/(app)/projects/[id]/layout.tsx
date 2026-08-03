import { projectIds } from "@/lib/static-params";

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
