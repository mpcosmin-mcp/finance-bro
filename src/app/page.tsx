import FireCalculator from "@/components/fire-calculator";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <main className="flex-1">
      <StructuredData />
      <FireCalculator />
    </main>
  );
}
