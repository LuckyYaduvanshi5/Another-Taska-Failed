# Productivity App

A modern task management and focus timer application built with React Native and Expo.

## Features

- 📝 Task Management
  - Create, edit, and delete tasks
  - Set priority levels and deadlines
  - Add tags and descriptions
  - Track task status

- ⏱️ Focus Timer
  - Pomodoro-style focus sessions
  - Customizable session durations
  - Break timer
  - Session history tracking

- 📊 Analytics
  - Track productivity metrics
  - View focus session statistics
  - Task completion rates
  - Daily/weekly/monthly reports

- 🎨 Customization
  - Light/Dark theme support
  - Customizable focus durations
  - Notification preferences
  - User preferences sync

## Tech Stack

- **Frontend Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Components**: React Native Paper
- **Backend/Database**: Supabase
- **State Management**: React Context
- **Charts**: react-native-chart-kit
- **Notifications**: expo-notifications

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator
- Supabase account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/LuckyYaduvanshi5/Taska.git
cd productivity-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Start the development server:
```bash
npx expo start
```

## Project Structure

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
│   │   ├── tasks/
│   │   ├── analytics.tsx
│   │   └── settings.tsx
│   └── _layout.tsx
├── src/
│   ├── components/          # Reusable components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── assets/                # Static assets
└── docs/                 # Documentation
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE,
    full_name TEXT,
    preferences JSONB
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title TEXT,
    description TEXT,
    status TEXT,
    priority INTEGER,
    deadline TIMESTAMP
);
```

[View complete schema in docs/schema.sql]

## Key Features Implementation

### Authentication Flow
- Email/password authentication using Supabase Auth
- Protected routes with authentication guards
- Persistent session management

### Task Management
- CRUD operations for tasks
- Real-time updates using Supabase subscriptions
- Priority-based sorting
- Tag-based organization

### Focus Timer
- Customizable focus sessions
- Break timer integration
- Session history tracking
- Push notifications

### Analytics
- Focus time tracking
- Task completion statistics
- Productivity trends
- Data visualization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Setup

### Development Environment
1. Install required tools:
```bash
npm install -g expo-cli
npm install -g typescript
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
- Create a new Supabase project
- Run the SQL scripts from `docs/schema.sql`
- Configure environment variables

### Running the App
```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

## Troubleshooting

Common issues and solutions:

1. **Metro Bundler Issues**
```bash
npx expo start -c
```

2. **Dependency Issues**
```bash
rm -rf node_modules
npm install
```

3. **TypeScript Errors**
```bash
npx tsc --noEmit
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/productivity-app](https://github.com/yourusername/productivity-app)

## Acknowledgments

- React Native Paper
- Supabase
- Expo Team
- All contributors
