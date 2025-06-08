Here’s the raw markdown content to copy-paste into VS Code:

````md
# AGENTS.md – Assistant AI Specification

## 1. Overview

**Assistant AI** is a GPT-powered personal life planner that builds, adapts, and manages a user’s dynamic schedule using natural language commands. It integrates goal logic, behavioral learning, location awareness, and real-time data (like traffic or photos) to automate task management and scheduling.

---

## 2. Capabilities

- Parse natural language into structured task mutations
- Optimize daily schedules by urgency, dependencies, and efficiency
- Group tasks by location or category
- Adjust task times based on real-time traffic
- Extract schedule data from images (OCR)
- Allow conversational rescheduling and feedback
- Send dynamic, context-aware reminders and departure alerts
- Learn user habits and refine task predictions
- Simulate internal logic debates and give suggestions
- Maintain tone-aware conversation style
- Interpret simple instruction chains (e.g., “Move gym to 8am and rename it”)

---

## 3. Functional Modules

### React Native Frontend
- `components/EditableTaskCard.tsx`
- `app/(tabs)/tasks.tsx`
- `hooks/usePingBackend.ts`
- `hooks/useUpdateTask.ts`
- `hooks/useInstructionPilot.ts`
- `hooks/gptCanvasTaskBridge.ts`

### Backend (Node.js + Express)
- `server.js`
- `api/tasks.js` – CRUD task routes
- `api/instructions.js` – Natural language mutation handler

---

## 4. Tools

- **Instruction Parser** (`parseInstruction.ts`): Converts user text into `{ action, field, target, value }`
- **Instruction Pilot Hook** (`useInstructionPilot.ts`): Receives and applies parsed instructions to UI
- **GPT Canvas Bridge** (`gptCanvasTaskBridge.ts`): Interface for GPT to mutate tasks
- **REST API**:
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
  - `POST /api/instruction`

---

## 5. Example Inputs

- “Move gym to 7am”
- “Delete my call with Jason”
- “Rename meeting to ‘Client Sync’”
- “Reschedule dentist to Friday”
- “Add a task for meditation every morning”
- “Pair gym and sauna”
- “What’s the best time to work on music?”

---

## 6. Example Outputs

- Natural language:
  ```json
  { "action": "update", "field": "startTime", "target": "gym", "value": "7am" }
````

* Instruction POST JSON:

  ```json
  {
    "instruction": "Move gym to 7am",
    "parsed": {
      "action": "update",
      "field": "startTime",
      "target": "gym",
      "value": "7am"
    }
  }
  ```

* GPT bridge usage:

  ```ts
  updateStartTime("gym", "07:00")
  ```

---

## 7. File References

### Frontend

📁 `frontend/`

* `app/(tabs)/tasks.tsx`
* `components/EditableTaskCard.tsx`
* `hooks/usePingBackend.ts`
* `hooks/useUpdateTask.ts`
* `hooks/useInstructionPilot.ts`
* `hooks/gptCanvasTaskBridge.ts`
* `utils/parseInstruction.ts`

### Backend

📁 `backend/`

* `server.js`
* `api/tasks.js`
* `api/instructions.js`

---

## 8. Planned Features

* Compound instruction parsing ("Move gym to 8 and rename to stretch")
* Full GPT input UI for mobile simulation
* ISO timestamp migration for task times
* Task mutation via chat UI
* AI-suggested tutorial retrigger
* Multilingual UI adaptation
* Deep work block generation
* Mood/context-based schedule adaptation
* End-to-end encrypted cloud sync
* Gold UI theme and one-time unlock tier

```
```
````md
---

## 9. Task Object Schema (Planned or Current)

```ts
interface Task {
  _id: string;
  title: string;
  location?: string;
  type: 'Setup' | 'Meeting' | 'Work'; // Enum to expand
  startTime: Date; // ISO format planned
  endTime?: Date;
  isLocked?: boolean;
  notes?: string;
}
````

---

## 10. Instruction Parsing Format

Natural language instructions are parsed into a standardized mutation object:

```ts
interface ParsedInstruction {
  action: 'add' | 'update' | 'delete';
  field?: 'title' | 'startTime' | 'location' | 'type';
  target?: string; // matching task title
  value?: string;  // new value for field
}
```

Examples:

```json
"Move gym to 7am" →
{ "action": "update", "field": "startTime", "target": "gym", "value": "7am" }

"Delete dentist" →
{ "action": "delete", "target": "dentist" }

"Rename 'stretch' to 'yoga'" →
{ "action": "update", "field": "title", "target": "stretch", "value": "yoga" }
```

---

## 11. Backend Route Map

* `GET /api/tasks` → fetch all tasks
* `POST /api/tasks` → create new task
* `PUT /api/tasks/:id` → update task by ID
* `DELETE /api/tasks/:id` → delete task by ID
* `POST /api/instruction` → receive natural instruction, apply parsed mutation

---

## 12. Frontend Integration Zones

* `EditableTaskCard.tsx` — task mutation UI with GPT trigger buttons
* `useInstructionPilot.ts` — dispatches parse + patch/save instruction logic
* `tasks.tsx` — displays task list and renders editable cards
* `parseInstruction.ts` — core utility for translating user input
* `gptCanvasTaskBridge.ts` — GPT-to-React mutation interface

---

## 13. Testing & Simulation Support

* Manual GPT test input via `TextInput` (pending visual setup)
* Real-time patch/update display using bridge
* Seed data from `/api/tasks/seed`
* Visual sync confirmed via Expo Go on iOS

---

## 14. Environment Configuration Notes

* Replace `localhost` with LAN IP (e.g., `http://10.0.0.174:3001/`) for mobile fetch
* `.env` support pending to store configurable backend URLs
* Development relies on Expo for frontend; Express + MongoDB for backend

---

## 15. Tags

`gpt4o`, `instruction parser`, `react native`, `expo`, `mongodb`, `task api`, `canvas bridge`, `backend routes`, `chat integration`, `natural language`, `editable tasks`, `goal planner`, `ocr`, `real-time scheduling`, `assistant ai`

```
```
````md
---

## 16. Deployment & Boot Instructions

### Frontend (React Native via Expo)
- Start dev server:
  ```bash
  cd frontend
  npx expo start
````

* Open Expo Go on mobile and scan QR code
* Make sure device is on same Wi-Fi as dev machine

### Backend (Node + Express)

* Start backend server:

  ```bash
  cd backend
  npm run dev
  ```
* Requires MongoDB running locally (e.g., `brew services start mongodb-community@7.0` on macOS)
* Ensure port `3001` is open and accessible

---

## 17. Critical Dependencies

* `express`, `cors`, `mongodb`, `nodemon` for backend
* `expo`, `react-native`, `expo-router` for frontend
* `typescript` + React Hooks for functional module logic

---

## 18. Known Issues & Limitations

* `localhost` fetch fails on mobile: requires local IP workaround
* No auth model yet: all data is assumed public and user-agnostic
* No offline or caching layer: fetches fail without connection
* No security checks on instruction payloads
* No fallback UI if instruction parsing fails
* Cannot yet handle compound mutations (e.g., rename + move)
* No persistence for GPT patch-only changes unless explicitly saved

---

## 19. Next Steps (Confirmed in Recaps)

* Add frontend GPT text entry field
* Finalize parseInstruction synonym handling
* Build fallback if instruction matches no task
* Implement compound parser (e.g., "rename X and move to Y")
* Add backend schema validation logic
* Prepare full test coverage for instruction mutations

---

## 20. Ownership

Assistant AI is an original invention by **Colin Allen Costello**, who retains full IP ownership. All AI scheduling logic, UI methodologies, and backend infrastructure were designed under his direction.

---

```
```
```md
## 21. Reference Architecture

### 📁 Project Root Structure

```

/Assistant-AI
├── backend/
│   ├── api/
│   │   ├── tasks.js
│   │   └── instructions.js
│   ├── models/
│   ├── server.js
│   ├── package.json
├── frontend/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   └── tasks.tsx
│   │   └── \_layout.tsx
│   ├── components/
│   │   └── EditableTaskCard.tsx
│   ├── hooks/
│   │   ├── usePingBackend.ts
│   │   ├── useUpdateTask.ts
│   │   ├── useInstructionPilot.ts
│   │   └── gptCanvasTaskBridge.ts
│   ├── utils/
│   │   └── parseInstruction.ts
│   ├── package.json
│   └── tsconfig.json

````

### Backend Run Command
```bash
node server.js  # or npm run dev if nodemon is installed
````

### Frontend Run Command

```bash
npx expo start
```

---

## 22. Contact & Support

For design logic, IP matters, or strategic decisions:
**Colin Allen Costello**
Email: [colincostelloassistant@gmail.com](mailto:colincostelloassistant@gmail.com)
Phone: 708-915-0989
Location: Mokena, IL, USA

---

## 23. Legal Notice

All components described herein are protected under a provisional patent filed by Colin Allen Costello in March 2025. Any unauthorized use, duplication, or redistribution of the Assistant AI system, its logic structures, or UI methodologies may constitute an infringement of intellectual property rights.

---

**End of AGENTS.md**

```
```
