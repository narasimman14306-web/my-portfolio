# LevelUp Buddy — Personal Life Management Android App

> **“Small Steps. Better You.”**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-blueviolet.svg)](https://capacitorjs.com/)
[![Dexie.js](https://img.shields.io/badge/Dexie.js-IndexedDB-green.svg)](https://dexie.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**LevelUp Buddy** is a modern, standalone, offline-first personal productivity and life-management Android application. It helps individuals systematically improve their daily routine, workout habits, tech skills, English communication, mental well-being, and personal discipline without needing internet access or remote servers.

---

## 🌟 Key Highlights

* **100% Offline & Private:** Zero backend server, zero cloud databases, and zero tracking. All habits, routines, and completion history remain securely stored inside your Android device via IndexedDB.
* **No Account Required:** Immediate access without registration, login screens, or subscriptions.
* **Robust Habit Tracking:** Streak counter with consecutive day tracking, historical best streak, 7-day visual momentum dots, and categorization.
* **Intelligent Routine Management:** Chronological daily schedule with day-of-week recurrence, priority tagging, and non-overlapping daily completions.
* **Quantified Analytics:** Real-time productivity metrics, weekly activity charts, and 30-day momentum trends powered by Recharts.
* **Backup & Restore:** Full JSON export and transactional import with schema validation.
* **Mobile-First Experience:** Native Android feel with touch-optimized interfaces, safe-area padding, bottom navigation, and Dark/Light themes.

---

## 📱 Application Modules & Navigation

LevelUp Buddy features a 5-tab bottom navigation bar:

1. **Home (Dashboard):**
   * Dynamic greeting based on the time of day and formatted date.
   * Daily completion progress ring calculating actual completion percentage.
   * Offline daily motivational quote from inspiring authors.
   * Quick-check checklists for today's scheduled routines and habits.
   * Weekly productivity bar chart.
   * One-click starter template loader for new users.

2. **Daily Routine:**
   * Create, edit, and delete recurring routines.
   * Time window definition (`startTime` to `endTime`) in 12h/24h format.
   * Active day-of-the-week selectors (`Everyday`, `Weekdays`, custom).
   * Categories: *Morning, Work, Learning, Fitness, Evening, Personal*.
   * Priority weighting: *High, Medium, Low*.

3. **Habit Tracker:**
   * Habit CRUD operations with custom theme colors and icons.
   * Unbroken current streak and all-time best streak calculations.
   * 7-day mini momentum tracker showing completed versus missed days.
   * Categories: *Health, Fitness, Career, Learning, English, Personal Growth, Mental Wellness, Finance*.

4. **Progress & Analytics:**
   * All-time completed actions counter.
   * Top active streak and consistency summary.
   * Recharts 7-day activity chart (routines vs habits stacked breakdown).
   * Recharts 30-day momentum area chart.
   * Star habit spotlight (best performing habit).

5. **Settings & Backup:**
   * Dark / Light mode toggle.
   * One-click JSON data backup export.
   * Safe transactional JSON backup restore with validation.
   * One-click sample suggestions reloader.
   * Factory reset / Clear all local data with confirmation safeguard.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 (ES6+) | Declarative component UI |
| **Build Tool** | Vite 8 | Ultra-fast bundling & HMR |
| **Mobile Packaging** | Capacitor 8 | Native Android wrapper |
| **Local Persistence** | Dexie.js (IndexedDB) | Relational client-side storage |
| **Routing** | React Router 7 (`HashRouter`) | Offline-safe Android navigation |
| **Styling** | Tailwind CSS v4 | Responsive modern design system |
| **Icons** | Lucide React | Clean, scalable vector icons |
| **Visualizations** | Recharts 3 | Interactive SVG charts |
| **Date Handling** | date-fns | Local calendar and streak math |
| **Testing** | Vitest | Fast unit test runner |

---

## 🏗️ Project Architecture

```
levelup-buddy/
├── android/                        # Native Android Studio Gradle project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml # App permissions and orientation
│   │   │   ├── assets/public/      # Bundled web assets
│   │   │   └── res/values/         # App name and resource configs
│   │   └── build.gradle
│   ├── build.gradle
│   └── gradlew.bat
├── public/
│   └── favicon.svg                 # Application icon
├── src/
│   ├── assets/                     # Static media and logos
│   ├── components/
│   │   ├── charts/                 # Recharts visualizations
│   │   ├── common/                 # Navbar, BottomNav, Modal, Badge, StatCard
│   │   ├── dashboard/              # GreetingCard, TodayRoutineList, TodayHabitList
│   │   ├── habits/                 # HabitCard, HabitFormModal
│   │   ├── layout/                 # AppLayout with safe area insets
│   │   └── routine/                # RoutineCard, RoutineFormModal
│   ├── context/
│   │   └── ThemeContext.jsx        # Dark/Light theme state
│   ├── db/
│   │   ├── database.js             # Dexie database and table schema
│   │   ├── migrations.js           # Schema migration tracker
│   │   └── seed.js                 # Realistic starter routines & habits
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── RoutinePage.jsx
│   │   ├── HabitsPage.jsx
│   │   ├── ProgressPage.jsx
│   │   └── SettingsPage.jsx
│   ├── services/
│   │   ├── backupService.js        # JSON export/import & wipe
│   │   ├── habitService.js         # Habit CRUD & completion query
│   │   ├── progressService.js      # Dashboard & chart metrics
│   │   └── routineService.js       # Routine CRUD & day scheduling
│   ├── utils/
│   │   ├── __tests__/              # Unit test suites (Vitest)
│   │   ├── dateUtils.js            # Timezone-safe date arithmetic
│   │   ├── quotes.js               # Offline quote database
│   │   ├── streakUtils.js          # Consecutive streak algorithms
│   │   └── validation.js           # Input and backup validation
│   ├── App.jsx                     # Router and page mapping
│   ├── index.css                   # Custom styles, glassmorphism & safe areas
│   └── main.jsx                    # React root entrypoint
├── capacitor.config.json           # Capacitor application configuration
├── package.json                    # Scripts and dependencies
├── vite.config.js                  # Vite & Tailwind configuration
├── vitest.config.js                # Vitest test setup
└── LICENSE                         # MIT License
```

---

## 🗄️ Local Database Schema (IndexedDB)

The database `LevelUpBuddyDB` uses Dexie.js:

1. **`routines`**:
   * `id`: Auto-incrementing primary key.
   * `title`, `description`, `category`, `startTime`, `endTime`, `daysOfWeek`, `priority`, `isActive`, `createdAt`, `updatedAt`.
   * Indexes: `++id, category, priority, isActive, createdAt`.

2. **`routineCompletions`**:
   * `id`: Auto-incrementing primary key.
   * `routineId`: Foreign key to `routines.id`.
   * `date`: Local calendar date string (`YYYY-MM-DD`).
   * `completedAt`: Timestamp.
   * Indexes: `++id, routineId, date, [routineId+date]`.

3. **`habits`**:
   * `id`: Auto-incrementing primary key.
   * `name`, `description`, `category`, `targetFrequency`, `color`, `icon`, `isActive`, `createdAt`, `updatedAt`.
   * Indexes: `++id, category, isActive, createdAt`.

4. **`habitCompletions`**:
   * `id`: Auto-incrementing primary key.
   * `habitId`: Foreign key to `habits.id`.
   * `date`: Local calendar date string (`YYYY-MM-DD`).
   * `completedAt`: Timestamp.
   * Indexes: `++id, habitId, date, [habitId+date]`.

5. **`settings`**:
   * `key`: Primary key (e.g. `'theme'`, `'db_version'`).
   * `value`: Setting value.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js**: v18.0.0 or higher (LTS recommended)
* **npm**: v9.0.0 or higher

### Installation

```bash
# 1. Clone repository & navigate to directory
cd levelup-buddy

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser. Open DevTools in Mobile view (e.g. Pixel 7 / iPhone) for the optimal experience.

### Run Tests

```bash
npm run test
```

### Production Web Build

```bash
npm run build
```

The output will be generated inside the `dist/` directory.

---

## 🤖 Building the Android APK

### Required Android Tools

To build an Android APK from this project, ensure you have:
1. **Android Studio** (Koala or Ladybug recommended)
2. **Android SDK** (API Level 34 or 35) with Android SDK Build-Tools
3. **Java Development Kit (JDK 17 or 21)** configured in your system `JAVA_HOME`

### Step-by-Step Android Build Commands

#### 1. Build & Sync Web Assets to Android
```bash
npm run cap:build
```
*(This command runs `vite build` followed by `npx cap sync android`, copying your latest code into `android/app/src/main/assets/public`)*

#### 2. Open Project in Android Studio
```bash
npm run cap:open
# or directly: npx cap open android
```

#### 3. Build a Debug APK
You can build the debug APK via Android Studio or the command line:

* **Via Command Line (PowerShell / Terminal):**
  ```powershell
  cd android
  ./gradlew assembleDebug
  ```
* **Output APK Location:**
  ```
  android/app/build/outputs/apk/debug/app-debug.apk
  ```
  Install it on your connected phone or emulator via:
  ```bash
  adb install android/app/build/outputs/apk/debug/app-debug.apk
  ```

#### 4. Generate a Signed Release APK
To create a standalone production APK for distribution or installation on your device:
1. In **Android Studio**, open the top menu and select **Build > Generate Signed Bundle / APK...**
2. Choose **APK** and click **Next**.
3. Select an existing keystore or click **Create new...** to create a signing key.
4. Select destination folder and choose build variant: **release**.
5. Click **Create**.
6. The signed APK will be output to:
   ```
   android/app/release/app-release.apk
   ```
7. Transfer this APK file directly to your Android device via USB or drive, and install it!

---

## 🔒 Privacy & Offline Guarantee

* **No Network Traffic:** LevelUp Buddy does not initiate any remote HTTP requests or analytics pings.
* **Full Data Ownership:** All data is exported as an open standard JSON format.
* **No Telemetry:** No user behavioral tracking or advertising SDKs are included.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
