# Skilline-App Copilot Instructions

## Project Overview
Skilline-App is an **Expo-based React Native educational platform** supporting iOS, Android, and web. It provides interactive online course management with authentication, tab-based navigation, and themed components.

**Tech Stack:** TypeScript + React Native + Expo Router + React Navigation  
**Target Platforms:** iOS, Android, Web

---

## Architecture & Key Patterns

### 1. File-Based Routing (Expo Router)
- **Structure:** App screens live in `app/` with automatic routing based on file paths
- **Key Layout:** 
  - `app/_layout.tsx` — Root stack with `(auth)` and `(tabs)` groups
  - `app/(auth)/` — Login/Register screens (no tab bar)
  - `app/(tabs)/` — Main app screens with bottom navigation
- **Pattern:** Use `expo-router` URL schemes like `/(auth)/login` and `/(tabs)/index`

### 2. Authentication & Route Protection

**Implementation:** ✅ COMPLETED with token-based auth flow

**Key Files:**
- `hooks/useAuth.ts` — Main auth hook with token management
- `hooks/useProtectedRoute.ts` — Redirect logic based on authentication state
- `app/_layout.tsx` — Root layout that checks auth on app startup
- `app/(auth)/login.tsx` — Login screen with token storage
- `app/(tabs)/profile.tsx` — Logout functionality
- `AUTH_FLOW.md` — Detailed authentication flow documentation
- `contexts/AuthContext.tsx` — Optional context wrapper for auth state

**Flow:**
```
App Startup → useAuth() checks AsyncStorage token
├─ Token valid & not expired → isAuthenticated = true → redirect /(tabs)/index
├─ Token expired → clear storage → isAuthenticated = false → redirect /(auth)/login
└─ No token → isAuthenticated = false → redirect /(auth)/login
```

**Token Storage:**
```json
AsyncStorage.authToken = {
  "token": "jwt_token_here",
  "expiresAt": 1732599600000
}
```

**Usage:**
```tsx
const { isAuthenticated, token, setAuthToken, logout } = useAuth();
// On login: await setAuthToken(apiToken, 86400); // 24 hours
// On logout: await logout();
```

### 3. Navigation Structure
- **Tabs Layout:** `app/(tabs)/_layout.tsx` with custom header and Ionicons-based tab icons
- **Tab Screens:**
  - `index.tsx` — Home (hero section with features)
  - `course.tsx` — Course browsing
  - `lecture.tsx` — Lecture player
  - `profile.tsx` — User profile
- **Safe Area Handling:** Always use `useSafeAreaInsets()` for bottom padding on tab bar

### 4. Component Patterns
- **Themed Components:** `components/themed-text.tsx`, `components/themed-view.tsx`
  - Use `useThemeColor()` hook to apply light/dark mode colors from `constants/theme.ts`
  - Supports light/dark color overrides via props: `lightColor="custom" darkColor="darkCustom"`
- **Icon Pattern:** Use `@expo/vector-icons/Ionicons` for UI icons, `lucide-react-native` for custom icons
- **Collapsible & UI:** Check `components/ui/collapsible.tsx` and `components/ui/icon-symbol.tsx` for reusable UI patterns

### 5. Styling Conventions
- **Colors:** Centralized in `constants/theme.ts` with light/dark variants
- **Platform Detection:** Use `Platform.select()` for platform-specific behavior (fonts, styles)
- **SafeAreaView:** Always import from `react-native-safe-area-context` for proper device inset handling

---

## Critical Developer Workflows

### Starting Development
```bash
npm install              # Install all dependencies
npx expo start          # Start dev server (a / i / w for Android/iOS/Web)
npm run lint            # Check TypeScript/ESLint errors
```

### Building for Production
```bash
expo run:ios            # Build and run on iOS simulator
expo run:android        # Build and run on Android emulator
npm run web             # Run web version
```

### Project Reset
```bash
npm run reset-project   # Moves starter code to app-example/, creates blank app/
```

---

## Project-Specific Conventions

### 1. TypeScript Paths
- **Alias:** `@/*` resolves to workspace root (configured in `tsconfig.json`)
- **Usage:** `import { useProtectedRoute } from '@/hooks/useProtectedRoute'`

### 2. File Naming
- Layout files: `_layout.tsx` (Expo Router convention)
- Screens: lowercase with `.tsx` extension
- Hooks: `use` prefix (e.g., `useProtectedRoute.ts`)
- Components: PascalCase (e.g., `ThemedText.tsx`)

### 3. Layout Screen Configuration
- Always use `screenOptions={{ headerShown: false }}` in group layouts unless custom headers are needed
- Group layouts in parentheses: `(auth)`, `(tabs)` — these don't appear in URLs

### 4. State Management
- **Current Approach:** Local component state with `useState()` and context hooks
- **No Redux/Zustand:** App uses React's built-in state management
- **Authentication State:** Currently mocked in comments; needs real implementation connecting to secure storage

---

## Integration Points

### 1. External Dependencies
- **Expo Router:** File-based routing and navigation
- **React Navigation:** Bottom tab navigation (`@react-navigation/bottom-tabs`)
- **Lucide Icons:** Custom vector icons (`lucide-react-native`)
- **Expo Modules:** Haptics, fonts, splash screen, browser, linking
- **AsyncStorage:** Token persistence (`@react-native-async-storage/async-storage`)

### 2. API Integration Pattern
Replace mock API in `app/(auth)/login.tsx`:

```tsx
const handleLogin = async () => {
    const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const { token, expiresInSeconds } = await response.json();
    await setAuthToken(token, expiresInSeconds);
};
```

### 3. Cross-Component Communication
- **Theme Hook:** `hooks/use-theme-color.ts` provides light/dark mode colors
- **Auth Hook:** `hooks/useAuth.ts` provides auth state throughout app
- **Safe Area:** Use `useSafeAreaInsets()` to adjust layouts for notches/home indicators

### 4. App Configuration
- **Entry Point:** `expo-router/entry` (specified in `package.json`)
- **TypedRoutes:** Enabled in `app.json` for type-safe route navigation
- **New Architecture:** Enabled (`newArchEnabled: true`)
- **Edge-to-Edge:** Enabled on Android for full-screen layouts

---

## Common Tasks & Examples

### Adding a New Screen
1. Create file in appropriate group: `app/(tabs)/newscreen.tsx`
2. Export functional component with JSX
3. Add to parent layout's `<Tabs.Screen />` or `<Stack.Screen />`

### Adding Theme Colors
1. Edit `constants/theme.ts` and add to `Colors.light` and `Colors.dark`
2. Use in components: `const color = useThemeColor({light: '#000', dark: '#fff'}, 'text')`

### Fixing Android Edge-to-Edge
- If content flows under status bar, wrap in `<SafeAreaView edges={['top']} />`

### Navigation Example
```tsx
import { useRouter } from 'expo-router';
const router = useRouter();
router.replace('/(auth)/login');  // Replace current screen
router.push('/(tabs)/course');     // Push new screen
```

---

## Debugging Tips
- **TypeScript Errors:** Run `npm run lint` for full diagnostic output
- **Route Issues:** Check `useSegments()` in `useProtectedRoute.ts` — logs current route group
- **Safe Area:** Verify status bar + notch layouts with simulator inset previews
- **Dark Mode:** Toggle in simulator settings to test both theme variants
