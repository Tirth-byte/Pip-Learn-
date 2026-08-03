import { quizIds } from "@/lib/static-params";

export function generateStaticParams() {
  return quizIds.map((id) => ({ id }));
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
