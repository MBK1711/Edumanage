# 🎨 CSS — How the app looks good

---

## Simple explanation
CSS is like the **interior designer** of the project.
It controls every color, font, spacing, button shape, animation, and glow effect you see.

We wrote all the CSS ourselves (no pre-made framework like Bootstrap or Tailwind).
This gives us full control over every visual detail — the glassmorphism cards,
the gradient banners, the hover effects — all custom.

---

## Where we use it
```
src/
├── index.css               ← Main styles: buttons, cards, badges, tables, colors
├── landing.css             ← Styles only for the landing page
├── landing_animations.css  ← Fade-in, bounce, and glow animations
├── teacher-dashboard.css   ← Extra styles for the teacher dashboard
└── student-dashboard.css   ← Extra styles for the student dashboard
```

---

## Why we write our own CSS
| Simple Reason | What it means |
|---|---|
| **Full control** | We can make the exact design we want — not limited to what Bootstrap gives |
| **Lighter** | No huge CSS framework loaded — only the styles we actually use |
| **CSS variables** | Change one color variable → the whole app updates to that color |

---

## How we use it

### 1. CSS Variables — shared colors and values
Think of these like **paint swatches** that every part of the app uses.
```css
/* index.css */
:root {
    --primary:      #6366f1;   /* The purple/indigo color */
    --success:      #10b981;   /* Green — used for "active" or "passed" */
    --danger:       #ef4444;   /* Red — used for errors and at-risk students */
    --text-primary: #1e293b;   /* Dark text */
    --text-muted:   #94a3b8;   /* Grey text */
}
```
Then anywhere in CSS you just write `color: var(--primary)` and it uses that purple.

### 2. Reusable classes — write once, use everywhere
```css
/* A card (the white rounded box) */
.card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

/* A glassy see-through card */
.glass-panel-enhanced {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(20px);  /* blurs what's behind it */
}

/* Primary button */
.btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-radius: 10px;
}
```

### 3. Animations — things that move smoothly
```css
/* Cards fade in from below when they appear */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeIn 0.5s ease; }

/* The animated gradient text on the landing page */
@keyframes gradientFlow {
    0%   { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}
```

### 4. Hover effects — cards lift when you hover
```css
.hover-lift-3d {
    transition: transform 0.25s ease;   /* smooth movement */
}
.hover-lift-3d:hover {
    transform: translateY(-4px);        /* moves up 4px */
    box-shadow: 0 12px 32px rgba(99,102,241,0.15);  /* shadow grows */
}
```

### 5. Badges (the little status labels)
```css
.badge-active  { background: rgba(16,185,129,0.12); color: #059669; }  /* green */
.badge-pending { background: rgba(245,158,11,0.12);  color: #d97706; }  /* yellow */
```
Used for: Published ✅, Draft 🟡, Archived ⬛
