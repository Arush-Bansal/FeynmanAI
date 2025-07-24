import AnalysisClient from "./AnalysisClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalysisClient />
    </Suspense>
  );
}