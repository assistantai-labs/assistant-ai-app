// Converts natural language into structured instruction objects
declare var require: any;
declare var module: any;

export type Instruction = {
  action: 'update';
  target: string;
  field: 'title' | 'location' | 'type' | 'startTime';
  value: string;
};

/**
 * Parse a natural language instruction string into one or more
 * structured Instruction objects.
 *
 * Supports compound instructions joined by conjunctions like "and".
 */
export function parseInstruction(input: string): Instruction[] {
  const segments = input
    .split(/\band\b/i)
    .map(s => s.trim())
    .filter(Boolean);

  const results: Instruction[] = [];
  let lastTarget = '';

  for (const seg of segments) {
    const lower = seg.toLowerCase();

    // Start Time Update: "move [target] to [time]" or "move it to [time]"
    let match = seg.match(/move\s+(.*?)\s+to\s+(\d{1,2}(?::\d{2})?(?:am|pm)?)/i);
    if (match) {
      const tgt = match[1].toLowerCase() === 'it' ? lastTarget : match[1];
      results.push({
        action: 'update',
        target: tgt,
        field: 'startTime',
        value: match[2],
      });
      lastTarget = tgt;
      continue;
    }

    // Type Change: "change [target] type to [value]"
    match = seg.match(/change\s+(.+)\s+type\s+to\s+(.+)/i);
    if (match) {
      results.push({
        action: 'update',
        target: match[1],
        field: 'type',
        value: match[2],
      });
      lastTarget = match[1];
      continue;
    }

    // Location Change: "move [target] to [location]" (if no time format)
    match = seg.match(/move\s+(.*?)\s+to\s+(.+)/i);
    if (match && !/\d/.test(match[2])) {
      const tgt = match[1].toLowerCase() === 'it' ? lastTarget : match[1];
      results.push({
        action: 'update',
        target: tgt,
        field: 'location',
        value: match[2],
      });
      lastTarget = tgt;
      continue;
    }

    // Title Rename: "rename [target] to [new name]"
    match = seg.match(/rename\s+(.+)\s+to\s+(.+)/i);
    if (match) {
      results.push({
        action: 'update',
        target: match[1],
        field: 'title',
        value: match[2],
      });
      lastTarget = match[1];
      continue;
    }
  }

  return results;
}

// Basic inline tests
if (require.main === module) {
  const assert = require('assert');

  const cases: [string, Instruction[]][] = [
    ['move gym to 7am', [{ action: 'update', field: 'startTime', target: 'gym', value: '7am' }]],
    [
      'rename gym to Stretch and move it to 8am',
      [
        { action: 'update', field: 'title', target: 'gym', value: 'Stretch' },
        { action: 'update', field: 'startTime', target: 'gym', value: '8am' },
      ],
    ],
  ];

  for (const [input, expected] of cases) {
    assert.deepStrictEqual(parseInstruction(input), expected);
  }

  console.log('parseInstruction tests passed');
}
