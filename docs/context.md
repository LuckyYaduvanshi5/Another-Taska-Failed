# Productivity App - Feature and Flow Documentation

## Overview
This productivity app is designed to help users focus on one task at a time using AI-powered task prioritization and a dedicated Focus Mode. Users can add tasks, manage priorities, and track progress efficiently.

# tech stack
Frontend: React Native with TypeScript, Expo, and Expo Router
Backend/Database: Supabase
UI Framework: React Native Paper
AI Processing: DeepSeek

## App Flow

### 1. Welcome Screen
- A clean, minimalistic interface greets the user.
- Options:
  - **Sign Up** (New Users)
  - **Log In** (Returning Users)

### 2. User Authentication
- **Sign Up Process:**
  - Enter email and password.
  - Confirm email verification (optional for security).
  - Redirect to onboarding.
- **Log In Process:**
  - Enter email and password.
  - Redirect to dashboard.

### 3. Onboarding (Optional)
- Short tutorial explaining key features:
  - Task addition.
  - AI prioritization.
  - Focus Mode.
  - Progress tracking.
- Option to skip.

### 4. Main Dashboard
- Displays tasks sorted by AI-determined priority.
- Features:
  - **Quick-Add Task Button** (Text input or voice command).
  - **AI Chat Interface** (Users can interact with AI to manage tasks).
  - **Task List** (Sorted by AI priority, includes edit and delete options).
  - **Profile & Settings** (Access user preferences, notification settings, etc.).

### 5. Task Management
- Users can:
  - **Add New Tasks** (Manually or via AI chat).
  - **Edit Existing Tasks** (Change title, description, or priority).
  - **Delete Tasks** (Remove completed or unnecessary tasks).
- AI prioritization adjusts task order based on:
  - Deadline urgency.
  - Task complexity.
  - User preferences.

### 6. Focus Mode
- **Activation:**
  - User selects a task.
  - App enters full-screen distraction-free mode.
  - Notifications are blocked.
  - Countdown timer starts.
- **Features:**
  - Task description displayed.
  - Progress tracking bar.
  - Option to pause or end session.

### 7. Post-Focus Session
- Summary of session:
  - Time spent.
  - Task progress.
  - Option to mark task as complete.
- Options:
  - **Start Another Session.**
  - **Take a Break.**

### 8. Analytics & Progress Tracking
- Users can track productivity over time:
  - Task completion rate.
  - Time spent in Focus Mode.
  - Productivity streaks.

### 9. Settings & Customization
- Users can configure:
  - Notification preferences.
  - Task prioritization preferences.
  - Theme settings (light/dark mode).
  - Account settings (change password, log out, etc.).

## Technologies & Implementation Notes
- **Frontend:** React Native (for cross-platform compatibility)
- **Backend:** Firebase / Node.js for authentication & database
- **AI Integration:** OpenAI API or custom AI model for task prioritization
- **Data Storage:** Firestore / PostgreSQL for task management
- **Focus Mode:** Local device settings to block notifications
- **Analytics:** In-app charts or integration with external analytics services

## Future Enhancements
- **Pomodoro Integration:** Automated break scheduling.
- **Collaboration Feature:** Share tasks with teams.
- **Voice Commands:** Task management via voice input.
- **Third-Party Integrations:** Sync with calendars and productivity apps.

## Database Schema

### Tables

#### 1. users
- `id`: uuid (PK)
- `email`: string (unique)
- `password_hash`: string
- `created_at`: timestamp
- `updated_at`: timestamp
- `full_name`: string
- `preferences`: jsonb
  ```json
  {
    "theme": "light" | "dark",
    "notifications": boolean,
    "focus_duration": number,
    "break_duration": number
  }
  ```

#### 2. tasks
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `title`: string
- `description`: text
- `status`: enum ('pending', 'in_progress', 'completed')
- `priority`: integer (1-5)
- `deadline`: timestamp
- `created_at`: timestamp
- `updated_at`: timestamp
- `complexity`: integer (1-5)
- `tags`: string[]

#### 3. focus_sessions
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `task_id`: uuid (FK -> tasks.id)
- `start_time`: timestamp
- `end_time`: timestamp
- `duration`: integer (in minutes)
- `completed`: boolean
- `notes`: text

#### 4. analytics
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `date`: date
- `total_focus_time`: integer (in minutes)
- `tasks_completed`: integer
- `productivity_score`: float

#### 5. notifications
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `type`: enum ('reminder', 'achievement', 'system')
- `message`: text
- `read`: boolean
- `created_at`: timestamp

## Database Relationships

1. **One-to-Many:**
   - User -> Tasks
   - User -> Focus Sessions
   - User -> Notifications
   - Task -> Focus Sessions

2. **Indexes:**
   - users(email)
   - tasks(user_id, status)
   - focus_sessions(user_id, task_id)
   - analytics(user_id, date)
   - notifications(user_id, read)

## Data Security

- Row Level Security (RLS) policies implemented in Supabase
- Encrypted password storage
- JWT authentication
- Rate limiting on API endpoints
- Regular data backups

## Folder Structure

```
productivity-app/
├── app/                      # Expo Router app directory
│   ├── (auth)/              # Authentication routes
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (main)/              # Main app routes
│   │   ├── dashboard.tsx
│   │   ├── focus/
│   │   │   ├── [id].tsx
│   │   │   └── summary.tsx
│   │   ├── tasks/
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   ├── analytics.tsx
│   │   └── settings.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Basic UI components
│   │   ├── tasks/          # Task-related components
│   │   ├── focus/          # Focus mode components
│   │   └── analytics/      # Analytics components
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React contexts
│   ├── services/           # API and external services
│   │   ├── supabase/      # Supabase related services
│   │   ├── ai/            # AI integration services
│   │   └── analytics/     # Analytics services
│   ├── utils/             # Helper functions
│   ├── types/             # TypeScript types/interfaces
│   ├── constants/         # App constants
│   └── theme/             # Theme configuration
├── assets/                # Images, fonts, etc.
├── docs/                  # Documentation
├── tests/                # Test files
├── .env                  # Environment variables
├── app.json             # Expo configuration
├── babel.config.js      # Babel configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

> This structured breakdown provides clarity for developers to implement the app effectively. 