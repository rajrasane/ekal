// ----- Token key stored in localStorage -----
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export interface AuthUser {
    id?: string | number;
    name?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
}

// Save JWT token received from Spring Boot
export function saveToken(token: string): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
    }
}

// Get JWT token
export function getToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
}

// Remove token (logout)
export function removeToken(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    const token = getToken();
    if (!token) return false;

    // Check if JWT is expired by reading the payload
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp && Date.now() / 1000 > payload.exp) {
            removeToken();
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

// Save user info
export function saveUser(user: AuthUser): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
}

// Get saved user info
export function getUser(): AuthUser | null {
    if (typeof window !== "undefined") {
        const raw = localStorage.getItem(USER_KEY);
        if (raw) return JSON.parse(raw) as AuthUser;
    }
    return null;
}

// Build Authorization header for API calls
export function authHeader(): { Authorization: string } | Record<string, never> {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}
