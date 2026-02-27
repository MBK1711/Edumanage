# 📦 Lucide React & React Hot Toast — Small helper libraries

---

## 1. Lucide React — Icons

### Simple explanation
Lucide React gives us **ready-made icons** (like emoji but cleaner and scalable).
Instead of downloading image files for every icon, we just import and use them as components.

### Where we use it
Mainly in the **landing page** — department icons, feature icons, navigation icons.

### Why we use it
- Icons look sharp at any screen size (they're SVG, not images)
- Hundreds of icons available — just pick by name
- Very small — only the icons you actually use are included

### How we use it
```jsx
// Import only the icons you need
import { GraduationCap, BookOpen, Users, Shield } from 'lucide-react';

// Use them like HTML tags
<GraduationCap size={28} color="#6366f1" />
<BookOpen size={20} />
<Users />
```
It's exactly like writing `<img>` but for icons — no file paths, no blurriness.

---

## 2. React Hot Toast — Popup notifications

### Simple explanation
React Hot Toast shows those small **"Login successful! ✅"** or **"Something went wrong ❌"**
messages that appear in the corner of the screen and disappear automatically.

### Where we use it
```
src/pages/LoginPage.jsx     ← "Login successful" or "Wrong password"
src/pages/RegisterPage.jsx  ← "Account created!" or "Email already exists"
```

### Why we use it
- Zero setup — works with just 2 lines of code
- Looks good without any extra styling
- Automatically disappears after 3-4 seconds
- Shows a loading spinner while waiting for the server

### How we use it

**Step 1 — Place it once at the app root (main.jsx)**
```jsx
import { Toaster } from 'react-hot-toast';

// Just add <Toaster /> anywhere in the app — it shows notifications globally
<App />
<Toaster position="top-right" />
```

**Step 2 — Trigger toasts anywhere**
```jsx
import toast from 'react-hot-toast';

// Show a success message
toast.success('Login successful!');

// Show an error message
toast.error('Wrong username or password.');

// Show a loading spinner while waiting for API
const id = toast.loading('Logging in...');
// ... after API responds:
toast.success('Welcome!', { id });   // replaces the spinner
// or:
toast.error('Failed', { id });
```
