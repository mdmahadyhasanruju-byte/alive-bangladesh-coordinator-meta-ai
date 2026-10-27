import { createDailyMicroActions, createWeeklyPlan } from '@/layers/action/tasks';

export default function TasksPage() {
  return <><h1 className="text-3xl font-bold">Tasks</h1><p className="mt-2 text-slate-600">Example plan only; completion is not saved.</p><h2 className="mt-6 font-semibold">Weekly plan</h2><ul className="mt-2 list-disc pl-6">{createWeeklyPlan().map((task) => <li key={task.id}>{task.title}</li>)}</ul><h2 className="mt-6 font-semibold">Daily micro-actions</h2><ul className="mt-2 list-disc pl-6">{createDailyMicroActions().map((task) => <li key={task.id}>{task.title}</li>)}</ul></>;
}
