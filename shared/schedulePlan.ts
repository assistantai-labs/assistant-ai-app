import { Goal } from './parseGoal';

export interface ScheduledTask {
  text: string;
  startTime: string;
}

/**
 * Simple scheduler that assigns each goal an hour block starting now.
 * Traffic and other constraints would be injected here in the future.
 */
export function schedulePlan(goals: Goal[]): ScheduledTask[] {
  const base = Date.now();
  return goals.map((g, i) => ({
    text: g.text,
    startTime: new Date(base + i * 60 * 60 * 1000).toISOString(),
  }));
}
