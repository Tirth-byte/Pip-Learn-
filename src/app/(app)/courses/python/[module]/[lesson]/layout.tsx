import { moduleLessonCounts } from "@/lib/static-params";

export function generateStaticParams() {
  const params: { module: string; lesson: string }[] = [];
  for (const [module, count] of Object.entries(moduleLessonCounts)) {
    for (let i = 1; i <= count; i++) {
      params.push({ module, lesson: `lesson-${i}` });
    }
  }
  return params;
}

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
