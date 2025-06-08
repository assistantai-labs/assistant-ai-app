// Converts natural language into structured instruction objects

export type Instruction = {
  action: 'update';
  target: string;
  field: 'title' | 'location' | 'type' | 'startTime';
  value: string;
};

export function parseInstruction(input: string): Instruction | null {
  const lower = input.toLowerCase();

  // Start Time Update: "move [target] to [time]"
  const timeMatch = lower.match(/move (.+) to (\d{1,2}(?::\d{2})?(?:am|pm)?)/);
  if (timeMatch) {
    return {
      action: 'update',
      target: timeMatch[1],
      field: 'startTime',
      value: timeMatch[2],
    };
  }

  // Type Change: "change [target] type to [value]"
  const typeMatch = lower.match(/change (.+) type to (.+)/);
  if (typeMatch) {
    return {
      action: 'update',
      target: typeMatch[1],
      field: 'type',
      value: typeMatch[2],
    };
  }

  // Location Change: "move [target] to [location]" (if no time format)
  const locationMatch = lower.match(/move (.+) to (.+)/);
  if (locationMatch && !locationMatch[2].match(/\d/)) {
    return {
      action: 'update',
      target: locationMatch[1],
      field: 'location',
      value: locationMatch[2],
    };
  }

  // Title Rename: "rename [target] to [new name]"
  const titleMatch = lower.match(/rename (.+) to (.+)/);
  if (titleMatch) {
    return {
      action: 'update',
      target: titleMatch[1],
      field: 'title',
      value: titleMatch[2],
    };
  }

  return null;
}