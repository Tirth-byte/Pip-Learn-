import { courseIds } from "@/lib/static-params";

export function generateStaticParams() {
  return courseIds.filter(id => id !== "python").map((courseId) => ({ courseId }));
}

export default function CourseDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
