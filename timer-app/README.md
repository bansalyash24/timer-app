# HealthFlex Timer Web App

This project is a React.js web application that allows users to create, manage, and interact with customizable timers. It is based on an assignment for a React Native app but has been adapted for web development using React.js. No backend is required as data persistence is handled via localStorage.

## Features

- **Timer Creation:** Add timers with a name, duration (in seconds), and category.
- **Timer List:** View timers grouped by categories with expandable sections.
- **Timer Controls:** Start, pause, and reset individual timers.
- **Bulk Actions:** Start, pause, or reset all timers within a specific category.
- **Progress Visualization:** See a progress bar indicating remaining time.
- **User Feedback:** Display a modal with a congratulatory message when a timer completes.
- **Timer History:** View a log of completed timers with names and completion times.
- **Customizable Alerts:** (Optional) A halfway alert logs a message when a timer reaches 50% of its duration.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/haradeva/timer-HealthFlex/
   cd timer-HealthFlex/timer-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the app:**

   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000`.

## Assumptions

- The app is built using React.js and does not require a backend.
- Data is persisted using `localStorage`.
- Timers are managed using React's `useState` and `useEffect` hooks.
- Navigation between the Home screen and History screen is handled by React Router.
- Minimal third-party dependencies are used.
