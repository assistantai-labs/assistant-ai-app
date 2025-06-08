# Assistant AI – Backend

This is the backend service for the Assistant AI app.

## 📦 Installation

```bash
cd backend
npm install
```

## 🚀 Running the Server

```bash
npm start
```
Or, for development with auto-reload:
```bash
npm run dev
```

## 🛠️ Project Structure

- `src/` – Main source code (routes, controllers, models, etc.)
- `dist/` – Compiled output (ignored by git)
- `.env` – Environment variables (not tracked by git)

## 🌐 API Overview

The backend exposes a REST API for managing tasks and other Assistant AI features.

### Example Endpoints

- `GET /tasks` – List all tasks
- `POST /tasks` – Create a new task
- `GET /tasks/:id` – Get a specific task
- `PUT /tasks/:id` – Update a task
- `DELETE /tasks/:id` – Delete a task

> See the source code in `src/routes/` for the full API.

## ⚙️ Environment Variables

Create a `.env` file in the backend root. Example:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/assistant-ai
```

## 📝 License

MIT