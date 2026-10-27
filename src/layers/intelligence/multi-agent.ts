export type AgentFinding = {
  agent: 'Emotional Analyzer' | 'Behavioral Analyst' | 'Strategic Planner' | 'Risk Detector' | 'Reality Checker';
  observation: string;
  confidence: number;
  basis: string;
  synthetic: true;
};

export function aggregate(findings: readonly AgentFinding[]) {
  const safeFindings = findings.filter((finding) => Number.isFinite(finding.confidence) && finding.confidence >= 0 && finding.confidence <= 1);
  return {
    findings: safeFindings,
    confidence: safeFindings.length
      ? Math.round((safeFindings.reduce((sum, item) => sum + item.confidence, 0) / safeFindings.length) * 100) / 100
      : null,
    synthetic: true as const,
    notice: 'Illustrative demo output only; not an assessment of a real person.',
  };
}

export function getSyntheticDemoFindings(): AgentFinding[] {
  return [
    { agent: 'Emotional Analyzer', observation: 'User feels isolated', confidence: 0.82, basis: 'Synthetic example only', synthetic: true },
    { agent: 'Behavioral Analyst', observation: 'Avoids difficult tasks', confidence: 0.72, basis: 'Synthetic example only', synthetic: true },
    { agent: 'Strategic Planner', observation: 'Focus on skill building', confidence: 0.78, basis: 'Synthetic example only', synthetic: true },
    { agent: 'Risk Detector', observation: 'Burnout risk', confidence: 0.64, basis: 'Synthetic example only', synthetic: true },
    { agent: 'Reality Checker', observation: 'Claims high ambition, low execution', confidence: 0.69, basis: 'Synthetic example only', synthetic: true },
  ];
}
