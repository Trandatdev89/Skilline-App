# Authentication Flow Guide

## Quy trình Đăng Nhập/Đăng Xuất

### 1. **App Startup Flow**

```
App khởi động
    ↓
RootLayout (_layout.tsx) gọi useAuth()
    ↓
useAuth() check AsyncStorage có token không
    ↓
├─ Có token + chưa hết hạn → isAuthenticated = true
├─ Có token + hết hạn → clear + isAuthenticated = false
└─ Không có token → isAuthenticated = false
    ↓
useProtectedRoute() nhận isAuthenticated
    ↓
├─ isAuthenticated = true → redirect /(tabs)/index (home)
└─ isAuthenticated = false → redirect /(auth)/login (login)
```

### 2. **Login Flow**

```
User nhập username/password
    ↓
handleLogin() validate
    ↓
Call API (hoặc mock API)
    ↓
API return token + expiresIn
    ↓
setAuthToken(token, expiresInSeconds)
    ├─ Lưu vào AsyncStorage: { token, expiresAt: now + expiresIn }
    ├─ Update state: isAuthenticated = true
    └─ trigger useProtectedRoute()
    ↓
useProtectedRoute() detect auth change
    ↓
Redirect /(tabs)/index (home)
```

### 3. **Logout Flow**

```
User click Logout button (profile.tsx)
    ↓
handleLogout() confirm dialog
    ↓
logout()
    ├─ Remove token từ AsyncStorage
    ├─ Update state: isAuthenticated = false
    └─ trigger useProtectedRoute()
    ↓
useProtectedRoute() detect auth change
    ↓
Redirect /(auth)/login (login)
```

### 4. **Token Expiry Check**

Token hết hạn trong 2 trường hợp:

**Case 1: User mở app lại**
```
App khởi động
    ↓
useAuth() check token expiry
    ↓
├─ expiresAt < now → token hết hạn
├─ Clear AsyncStorage
├─ isAuthenticated = false
    └─ useProtectedRoute() redirect login
```

**Case 2: Token sắp hết (optional)**
```
// TODO: Có thể thêm refresh token mechanism
// Khi token còn 5 phút, tự động call API refresh
// Hoặc khi API return 401, redirect login
```

## Các File Quan Trọng

### `hooks/useAuth.ts`
- Main hook quản lý auth state
- Kiểm tra token khi app startup
- setAuthToken() để lưu token
- logout() để xóa token

### `hooks/useProtectedRoute.ts`
- Redirect logic dựa vào `isAuthenticated`
- Gọi trong `app/_layout.tsx`
- Check `segments[0]` để biết user ở trang auth hay main

### `app/_layout.tsx`
- Root layout
- Gọi `useAuth()` + `useProtectedRoute()`
- Hiển thị loading screen

### `app/(auth)/login.tsx`
- Login form
- Call `setAuthToken()` khi đăng nhập thành công
- Redirect tự động trigger

### `app/(tabs)/profile.tsx`
- Có nút logout
- Call `logout()` khi user confirm
- Redirect tự động trigger

### `contexts/AuthContext.tsx` (optional)
- Nếu bạn muốn chia sẻ auth state nhiều components
- Wrap `<AuthProvider>` ở root layout
- Use `useAuthContext()` thay vì `useAuth()`

## Cách Sử Dụng

### 1. **Check User Đã Login Chưa**

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
    const { isAuthenticated, token } = useAuth();
    
    if (!isAuthenticated) {
        return <Text>Vui lòng đăng nhập</Text>;
    }
    
    return <Text>Token: {token}</Text>;
}
```

### 2. **Integrate với API**

```tsx
// app/(auth)/login.tsx
const handleLogin = async () => {
    try {
        const response = await fetch('https://api.example.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (data.token) {
            // expiresInSeconds là từ API (ví dụ 86400 = 24 giờ)
            await setAuthToken(data.token, data.expiresInSeconds);
        }
    } catch (error) {
        Alert.alert('Lỗi', 'Đăng nhập thất bại');
    }
};
```

### 3. **Token-Based API Call**

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
        const data = await response.json();
        return data;
    };
}
```

## AsyncStorage Structure

```json
{
  "authToken": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": 1732599600000
  }
}
```

## TODO List

- [ ] Replace mock API với real API endpoint
- [ ] Add refresh token mechanism (if needed)
- [ ] Handle 401 response từ API
- [ ] Add token validation on app resume
- [ ] Add biometric login (fingerprint/face)
- [ ] Implement remember me feature
- [ ] Add password reset flow
