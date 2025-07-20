# Copilot Instructions for ToDo_App (Firebase)

## Project Overview
- This is a modular, multi-page ToDo web app using vanilla JS, HTML, CSS, and Firebase for authentication and data storage.
- Main folders: `home/`, `myTodos/`, `profile/`, `logout/`, `signUp/`, each with their own HTML, JS, and CSS files.
- Shared Firebase logic is in `firbase/firebase.js` (note the typo: "firbase").
- Images are in the `images/` directory.

## Architecture & Data Flow
- User authentication and data are managed via Firebase (Firestore, Auth).
- User state (e.g., `uid`) is stored in `localStorage` and checked on each page load for route protection.
- Each page loads its own JS module for UI logic and Firebase calls.
- Navigation is handled via static HTML links; burger menu for mobile is toggled with JS.

## Key Patterns & Conventions
- Always check for `uid` in `localStorage` on page load; redirect to `index.html` if not present (see `routeCheck` in `logout/logout.js`).
- Use `window.addEventListener("load", ...)` to initialize page logic.
- DOM is updated by injecting HTML into elements (e.g., user info in logout card).
- All Firebase calls are made via the imported `firbase/firebase.js` module.
- Use `type="module"` for all `<script>` tags.
- CSS is modular per page, but nav and background styles are often duplicated for consistency.

## Developer Workflows
- No build step: edit HTML/CSS/JS directly and reload in browser.
- No test automation; manual testing in browser is expected.
- Debugging: use browser dev tools; check `localStorage` and Firebase console for data/state.
- To add a new page, copy the structure of an existing folder (HTML, JS, CSS) and update navigation links.

## Integration Points
- All Firebase config and initialization is in `firbase/firebase.js`.
- User data is stored in Firestore under a `users` collection, keyed by `uid`.
- Images are referenced with relative paths from the `images/` directory.

## Examples
- See `logout/logout.js` for route protection and dynamic user info rendering.
- See `myTodos/myTodods.js` for ToDo CRUD operations (naming typo: "myTodods").
- See `signUp/signup.js` for registration and login logic.

## Special Notes
- Watch for typos in folder/file names (e.g., `firbase`, `myTodods`).
- Navigation and UI are duplicated across pages; changes to nav require updating each HTML/CSS file.
- No framework or bundler is used; all code is ES6 modules and static assets.

---

If you add new features, follow the modular folder structure and update navigation in all relevant HTML files. For any cross-page logic, consider centralizing in a shared JS module.
