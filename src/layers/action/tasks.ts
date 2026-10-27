export type ActionTask = { id: string; title: string; cadence: 'weekly' | 'daily'; completed: boolean };

export function createWeeklyPlan(): ActionTask[] {
  return [1, 2, 3].map((number) => ({ id: `weekly-${number}`, title: `Weekly priority ${number}`, cadence: 'weekly', completed: false }));
}

export function createDailyMicroActions(): ActionTask[] {
  return [
    { id: 'truthful-lines', title: 'Write 5 truthful lines', cadence: 'daily', completed: false },
    { id: 'meaningful-task', title: 'Choose 1 meaningful task', cadence: 'daily', completed: false },
    { id: 'reflection', title: 'Spend 10 minutes reflecting', cadence: 'daily', completed: false },
  ];
}
