import { ModuleClient } from "./module-client";

export function generateStaticParams() {
  return [
    { module: "basics" },
    { module: "basic" },
    { module: "control-flow" },
    { module: "functions" },
    { module: "data-structures" },
    { module: "fundamentals" },
    { module: "python-fundamentals" },
    { module: "module-1" },
    { module: "1" },
    { module: "smart-calculator" },
  ];
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  return <ModuleClient module={module} />;
}
