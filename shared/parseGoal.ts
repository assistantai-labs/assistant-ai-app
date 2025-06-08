export type Goal = {
  text: string;
  priority: 'high' | 'medium' | 'low';
};

/**
 * Parse free-form goal text into a list of structured goal objects.
 * Very naive implementation that splits by commas and the word "and".
 */
export function parseGoal(input: string): Goal[] {
  const cleaned = input
    .replace(/try to|please|i (?:need|want) to/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  const segments = cleaned
    .split(/,| and /i)
    .map(s => s.trim())
    .filter(Boolean);

  return segments.map(text => ({
    text,
    priority: /must|need|by \d/.test(text) ? 'high' : /try|should/.test(text) ? 'medium' : 'low',
  }));
}
