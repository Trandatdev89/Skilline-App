# Quick Start Guide - Authentication Setup

## ✅ What's Been Implemented

### 1. **Token-Based Authentication**
- ✅ AsyncStorage token storage with expiry check
- ✅ Automatic token validation on app startup
- ✅ Protected routing - redirect based on auth state
- ✅ Login screen with form validation
- ✅ Logout button with confirmation dialog

### 2. **Project Structure**

```
hooks/
  ├── useAuth.ts              # Main auth hook - token management
  └── useProtectedRoute.ts    # Redirect logic

app/
  ├── _layout.tsx             # Root layout - calls useAuth() + useProtectedRoute()
  ├── (auth)/
  │   ├── _layout.tsx
  │   └── login.tsx           # Login screen with token saving
  └── (tabs)/
      ├── _layout.tsx
      ├── index.tsx           # Home screen
      ├── profile.tsx         # Logout button
      └── ...

contexts/
  └── AuthContext.tsx         # Optional context wrapper

AUTH_FLOW.md                   # Detailed flow documentation
```

## 🚀 How It Works

### **App Startup Flow**

```
App Start
  ↓
useAuth() checks AsyncStorage for token
  ├─ Token valid → isAuthenticated = true
  ├─ Token expired → clear + isAuthenticated = false  
  └─ No token → isAuthenticated = false
  ↓
useProtectedRoute() redirects based on auth state
  ├─ Not auth → redirect /(auth)/login
  └─ Authenticated → redirect /(tabs)/index
```

### **Login Flow**

```
User enters credentials
  ↓
handleLogin() validates
  ↓
API call (or mock)
  ↓
setAuthToken(token, expiresInSeconds)
  ├─ Save to AsyncStorage
  ├─ Update isAuthenticated = true
  └─ useProtectedRoute() auto-redirects to home
```

### **Logout Flow**

```
User clicks Logout
  ↓
Confirm dialog
  ↓
logout()
  ├─ Remove from AsyncStorage
  ├─ Update isAuthenticated = false
  └─ useProtectedRoute() auto-redirects to login
```

## 📝 Usage Examples

### **Check If User Is Logged In**

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) return <ActivityIndicator />;
    if (!isAuthenticated) return <Text>Please login</Text>;
    
    return <Text>Welcome!</Text>;
}
```

### **Access Token for API Calls**

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
    const { token } = useAuth();
    
    const fetchData = async () => {
        const response = await fetch('https://api.example.com/data', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.json();
    };
}
```

### **Integrate With Your Backend**

In `app/(auth)/login.tsx`, replace the mock API:

```tsx
const handleLogin = async () => {
    try {
        setIsLoading(true);
        
        // Call your actual API
        const response = await fetch('https://your-api.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        
        const data = await response.json();
        
        // Save token (expiresInSeconds typically comes from API)
        await setAuthToken(data.token, data.expiresInSeconds);
        
        // Auto-redirect happens via useProtectedRoute()
    } catch (error) {
        Alert.alert('Error', error.message);
    } finally {
        setIsLoading(false);
    }
};
```

## 🔐 Token Storage Format

Tokens are stored in AsyncStorage with expiry tracking:

```json
{
  "authToken": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": 1732599600000
  }
}
```

## 📦 Dependencies Added

- `@react-native-async-storage/async-storage` - Local token storage

Already installed? Check with:
```bash
npm install
```

## 🧪 Testing

### **Test Login Flow (Mock)**
1. Run app: `npm start`
2. Go to login screen
3. Enter any username/password
4. Should auto-redirect to home

### **Test Token Expiry**
Edit `useAuth.ts` to test:
```tsx
// Make token expire immediately
const expiresAt = Date.now() - 1000; // Already expired
```

### **Test Logout**
1. Go to Profile tab
2. Click Logout
3. Should auto-redirect to login

## 📚 Next Steps

### **Production Ready Checklist**

- [ ] Connect to real API endpoint in login.tsx
- [ ] Add refresh token mechanism (if needed)
- [ ] Handle 401/403 responses from API
- [ ] Add token refresh on app resume
- [ ] Implement biometric login (optional)
- [ ] Add remember me functionality
- [ ] Implement password reset flow
- [ ] Add multi-language support (i18n)

### **Optional Enhancements**

```tsx
// 1. Refresh token on app resume
useAppState().addEventListener('change', handleAppState);

// 2. Validate token on API 401 response
const handleUnauthorized = async () => {
    await logout();
};

// 3. Add forgot password
const handleForgotPassword = async (email) => {
    // Send reset link API
};

// 4. Add biometric login
const handleBiometricLogin = async () => {
    // Biometrics.authenticate()
};
```

## 🐛 Troubleshooting

### **App Not Redirecting to Login**
- Check `app/_layout.tsx` - make sure useProtectedRoute is called
- Check browser console logs for `useProtectedRoute` debug messages

### **Token Not Saving**
- Check AsyncStorage is properly installed
- Verify token format in handleLogin()

### **Logout Not Working**
- Check Profile screen has logout button
- Verify logout() function is called

---

📖 See `AUTH_FLOW.md` for detailed documentation.
