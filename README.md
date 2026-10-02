# 💪 FitLog — Workout Library

FitLog is a modern and responsive workout library built with **Next.js** and **Tailwind CSS**. It allows users to explore exercises, view detailed workout information, create a daily workout plan, save exercises for later, and track completed workouts.

---

## 📸 Screenshots

<img width="1904" height="792" alt="image" src="https://github.com/user-attachments/assets/18038ac3-3037-4ad5-bf1e-bfe605b87019" />
<img width="1903" height="697" alt="image" src="https://github.com/user-attachments/assets/7546b2a8-9afe-4cf8-977e-4321cd7c7d18" />

<img width="1902" height="906" alt="image" src="https://github.com/user-attachments/assets/042a4f49-5d5d-4fd8-a36e-c26402bb547f" />



---

## ✨ Key Features

- 🏋️ Browse a workout library with exercises from different muscle groups
- 🔎 View detailed workout information including equipment, difficulty, sets, reps, duration, calories, and rating
- 📋 Add workouts to **Today's Plan** with a maximum limit of five exercises
- 💾 Save workouts for later
- ✅ Mark planned workouts as completed
- ❌ Remove workouts from the plan or saved list
- 🔔 Toast notifications for workout actions
- 📊 Live workout metrics for exercises, minutes, and calories
- 🔃 Sort workouts by duration, calories, or rating
- 📱 Fully responsive design for mobile, tablet, and desktop
- 💾 Persist plan and saved workouts using localStorage
- 🚫 Custom 404 page for invalid routes

---

## 🛠️ Technologies Used

- **Next.js** — React framework and application routing
- **React.js** — UI development
- **Tailwind CSS** — Styling and responsive design
- **JavaScript** — Application logic
- **REST API** — Workout data
- **LocalStorage** — Persisting plan and saved workout data
- **React Toastify** — Toast notifications
- **Vercel** — Deployment

---

## 🔌 API

### All Workouts

[https://api.api-store.workers.dev/api/fitlog](https://api.api-store.workers.dev/api/fitlog)

### Single Workout

[https://api.api-store.workers.dev/api/fitlog/:id](https://api.api-store.workers.dev/api/fitlog/:id)

---

## 📋 Main Pages

### 🏠 Home Page

The home page includes:

- Workout Library hero section
- Browse Workouts CTA
- Workout cards
- Workout categories
- Duration, calories, and rating information
- Sort functionality
- Responsive workout grid

### 🏋️ Workout Details Page

Each workout has a dedicated details page containing:

- Workout image
- Workout name
- Description
- Category tags
- Equipment
- Difficulty
- Sets and reps
- Duration
- Calories
- Rating
- Step-by-step instructions
- Add to Today's Plan
- Save for Later

### 📋 My Plan Page

The My Plan page includes:

- Today's Plan
- Saved workouts
- Exercise count
- Total workout minutes
- Total calories
- View Details
- Mark as Done
- Remove workout
- Empty state
- Responsive workout cards

---

## 📊 Workout Management

### Today's Plan

Users can add workouts to Today's Plan and manage them from the My Plan page.

The plan supports a maximum of **5 workouts**.

### Saved Workouts

Users can save workouts and access them from the **Saved** tab.

### Mark as Done

Users can mark a planned workout as completed. A toast notification is displayed after the action.

### Remove

Users can remove workouts from Today's Plan or Saved workouts using the remove button.

---

## 🔃 Sort Workouts

The library supports sorting workouts by:

- Duration
- Calories
- Rating

The default sorting option is **Duration**.

---

## 📱 Responsive Design

FitLog is designed to work across:

- 📱 Mobile
- 📲 Tablet
- 💻 Desktop

The layout automatically adapts the navbar, hero section, workout grid, cards, and My Plan page for different screen sizes.

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/rasib-iftekhar/fit-log.git
```

### 2. Go to the project directory

```bash
cd fit-log
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in your browser

```text
http://localhost:3000
```

---

## 🧰 Available Scripts

### Development

```bash
npm run dev
```

Runs the application in development mode.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Start

```bash
npm start
```

Starts the production server.

---

## 🚀 Deployment

The project is deployed using **Vercel**.

### Live Project

[https://fit-log-six-smoky.vercel.app/](https://fit-log-six-smoky.vercel.app/)


---

## 👨‍💻 Author

### Mohammad Rasib Iftekhar Nabil

- 🐙 **GitHub:** [https://github.com/rasib-iftekhar](https://github.com/rasib-iftekhar)
- 🌐 **Portfolio:** [https://rasib.com.bd](https://rasib.com.bd)
- 📧 **Email:** [rasib.info@gmail.com](mailto:rasib.info@gmail.com)
