# 📱 TPCC-app (AI Companion Mobile)

A React Native mobile app built with Expo that lets users chat with an AI persona of a historical figure. The current release features Qin Shi Huang, the First Emperor of China. It talks to the [AI Companion Backend](https://github.com/AITPCC/AI-Companion---Backend-AI) for chat, authentication and user profiles.

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Download](#-download)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Local Setup Guide](#-local-setup-guide)
- [Additional Resources](#-additional-resources)

## 🎯 Project Description

TPCC-app is a cross-platform (iOS and Android) chat app. The service supports:

- **Historical Figure Chat**: Have a conversation with an AI persona of Qin Shi Huang (`history_figure` mode)
- **Guest Access**: Tap "Skip for now" on the login screen to start chatting without an account
- **Optional Accounts**: Sign up, log in, edit your username and log out
- **Account Deletion**: Delete your account from inside the app (Profile → Delete account)
- **Session Persistence**: Login tokens are kept in secure storage and restored on app launch

## 📲 Download

The app is available on both stores:

- **iOS**: [App Store](https://apps.apple.com/app/id6777379501) (listed as **TPCC-app**)
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=com.anonymous.TPCCapp) (listed as **AI-TPCC**)

An internet connection is required to receive AI responses.

## 🛠 Tech Stack

### Core Framework

- **[Expo](https://expo.dev/)** (SDK 57) - Toolchain and runtime for React Native apps
- **[React Native](https://reactnative.dev/)** 0.86 with **React 19**
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript

### Navigation and UI

- **[Expo Router](https://docs.expo.dev/router/introduction)** - File-based routing
- **expo-linear-gradient**, **expo-image**, **@expo/vector-icons** - UI building blocks

### Storage and Build

- **expo-secure-store** - Stores login and guest tokens securely on the device
- **[EAS](https://docs.expo.dev/eas/)** - Cloud builds and store submission

## 📁 Folder Structure

```
AI-Companion-Mobile/
├── app/                          # Screens (file-based routes)
│   ├── _layout.tsx               # Root layout, wraps the app in AuthProvider
│   ├── index.tsx                 # Login screen (landing route)
│   ├── signup.tsx                # Sign up screen
│   ├── chat.tsx                  # Chat screen
│   ├── profile.tsx               # Profile: edit username, log out, delete account
│   └── reset-password.tsx        # UI-only stub (no backend endpoint, not linked anywhere)
│
├── components/                   # Reusable UI components
│   ├── auth/                     # AppModal, AuthBackground, AuthHeader, Buttons, FormField
│   ├── chat/                     # ChatInput, MessageBubble, ModeHeader
│   └── navigation/               # TopNavBar, SideMenu
│
├── contexts/
│   └── AuthContext.tsx           # Session state, guest token, auth actions
│
├── lib/
│   ├── authApi.ts                # Auth and user API calls
│   └── chatApi.ts                # Chat API call with retries, base URL, health check
│
├── constants/                    # Colors and typography
├── assets/                       # Icons, splash and images
├── app.json                      # Expo config (version, bundle id, build numbers)
├── eas.json                      # EAS build and submit profiles
└── README.md                     # This file
```

### Key Directories Explained

- **`app/`**: Every file is a route. `index.tsx` is the landing route and shows the login screen.
- **`contexts/`**: `AuthContext` owns the current user, restores the session on launch, and exposes `logIn`, `signUp`, `logOut`, `updateProfile`, `deleteAccount`, and token helpers.
- **`lib/`**: The only place that talks to the backend. Screens call these through the context, not directly.
- **`components/`**: Presentational components grouped by feature.

## 🚀 Local Setup Guide

### Prerequisites

- **Node.js 20 or higher** (developed on Node 22) and **npm**
- **[Expo Go](https://expo.dev/go)** on your phone, or an iOS simulator / Android emulator
- A running backend, or use the production API

### Step 1: Clone the Repository

```bash
git clone git@github.com:AITPCC/AI-Companion-Mobile.git
cd AI-Companion-Mobile
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Point the App at a Backend

The app reads `EXPO_PUBLIC_API_BASE_URL`. The committed `.env` already points at the production API:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.qinshihuang.ai
```

To use a local backend instead, change it to your machine's address, for example `http://192.168.1.10:8000`.

> Do not use `127.0.0.1` when testing on a physical phone. It points at the phone itself, not your computer.

### Step 4: Run the App

```bash
npx expo start
```

Then scan the QR code with Expo Go, or press `i` (iOS simulator) or `a` (Android emulator).

### Step 5: Verify the Setup

1. On the login screen, tap **Skip for now**.
2. Send a message in the chat. You should get a reply from Qin Shi Huang.

### Troubleshooting

**Issue: "Could not reach the server. Is it running?"**

- Check that `EXPO_PUBLIC_API_BASE_URL` is correct and the backend is reachable from your device
- Restart Expo with a clean cache: `npx expo start -c` (environment variables are read at start)

**Issue: Changes to `.env` have no effect**

- Restart the dev server with `npx expo start -c`

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction)
- [EAS Build](https://docs.expo.dev/build/introduction/) and [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [AI Companion Backend](https://github.com/AITPCC/AI-Companion---Backend-AI)

**Happy Coding! 🚀**
