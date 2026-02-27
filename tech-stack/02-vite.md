# ⚡ Vite 7 — Frontend Build Tool & Dev Server

---

## What is it?
Vite is a modern build tool that provides an extremely fast development server and
bundles the React app for production using **Rolldown** (Rust-based bundler).

---

## Where is it used?
```
edumanage-frontend/
├── vite.config.js       ← Vite configuration (React plugin)
├── index.html           ← Entry HTML file Vite serves
└── package.json         ← "dev": "vite" script runs the server
```

---

## Why Vite?
| Reason | Explanation |
|--------|-------------|
| **Instant server start** | No bundling at startup — serves files natively via ES modules |
| **Hot Module Replacement** | When you save a `.jsx` or `.css` file, only that module updates in the browser instantly — no full reload |
| **Fast builds** | Uses esbuild (Go) for transforms, Rolldown (Rust) for bundling — far faster than Webpack |
| **Zero config for React** | One plugin (`@vitejs/plugin-react`) is all that's needed |

---

## How it's used in this project

### 1. Dev server — starts the frontend
```cmd
cd edumanage-frontend
npm run dev
```
→ Starts at **http://localhost:5174**

### 2. vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### 3. index.html — entry point
```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```
Vite serves this HTML and injects the React app into `#root`.

### 4. main.jsx — mounts React
```jsx
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

### 5. Production build
```cmd
npm run build
```
Creates an optimized `dist/` folder ready to deploy to any static host.
