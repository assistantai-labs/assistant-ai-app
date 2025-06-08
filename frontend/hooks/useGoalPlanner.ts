import { useState } from 'react';

interface ScheduledTask {
  text: string;
  startTime: string;
}

export function useGoalPlanner() {
  const [schedule, setSchedule] = useState<ScheduledTask[]>([]);

  async function planGoals(text: string) {
    const res = await fetch('http://localhost:3001/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error('Failed to plan goals');
    }

    const data = await res.json();
    setSchedule(data.schedule);
    return data.schedule as ScheduledTask[];
  }

  return { schedule, planGoals };
}
