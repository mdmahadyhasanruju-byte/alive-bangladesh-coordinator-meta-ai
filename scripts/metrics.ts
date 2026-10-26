export type MetricResult = {
  passed: boolean;
  duration_ms: number;
  fields_correct?: number;
  fields_total?: number;
  evidence_refs?: number;
  sentences?: number;
  deadline_case?: boolean;
  deadline_invented?: boolean;
  missing_info_case?: boolean;
  missing_info_detected?: boolean;
};

function percentage(numerator: number, denominator: number): number {
  return denominator ? (numerator / denominator) * 100 : 0;
}

export function calculateMetrics(results: any[]): {
  fieldPrecision: number;
  evidenceTraceabilityPct: number;
  deadlineHallucinationRate: number;
  missingInfoDetectionRate: number;
  e2eSuccessRate: number;
  medianProcessingMs: number;
} {
  const typedResults = results as MetricResult[];
  const fieldsCorrect = typedResults.reduce((total, result) => total + (result.fields_correct ?? 0), 0);
  const fieldsTotal = typedResults.reduce((total, result) => total + (result.fields_total ?? 0), 0);
  const refCount = typedResults.reduce((total, result) => total + (result.evidence_refs ?? 0), 0);
  const sentenceCount = typedResults.reduce((total, result) => total + (result.sentences ?? 0), 0);
  const deadlineCases = typedResults.filter((result) => result.deadline_case);
  const missingInfoCases = typedResults.filter((result) => result.missing_info_case);
  const durations = typedResults.map((result) => result.duration_ms).sort((a, b) => a - b);
  const middle = Math.floor(durations.length / 2);
  const medianProcessingMs = durations.length === 0
    ? 0
    : durations.length % 2
      ? durations[middle]
      : (durations[middle - 1] + durations[middle]) / 2;

  return {
    fieldPrecision: percentage(fieldsCorrect, fieldsTotal),
    evidenceTraceabilityPct: percentage(Math.min(refCount, sentenceCount), sentenceCount),
    deadlineHallucinationRate: percentage(deadlineCases.filter((result) => result.deadline_invented).length, deadlineCases.length),
    missingInfoDetectionRate: percentage(missingInfoCases.filter((result) => result.missing_info_detected).length, missingInfoCases.length),
    e2eSuccessRate: percentage(typedResults.filter((result) => result.passed).length, typedResults.length),
    medianProcessingMs,
  };
}
