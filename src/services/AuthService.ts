import { AxiosResponse } from "axios";
import auth from "../axios";
import { AuthResponse } from "../types/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return auth.post<AuthResponse>('/login', {email, password})
    }

    static async register(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return auth.post<AuthResponse>('/register', {email, password})
    }

    static async logout(): Promise<void> {
        return auth.post('/logout')
    }
}