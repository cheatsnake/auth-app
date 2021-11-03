import axios from "axios";
import { makeAutoObservable } from "mobx";
import { AUTH_URL } from "../axios";
import AuthService from "../services/AuthService";
import { IUser } from "../types/IUser";
import { AuthResponse } from "../types/response/AuthResponse";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    viewForm = 'Login';
    isLoading = false;
    message = '';

    constructor() {
        makeAutoObservable(this);
    }
    
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setViewForm(form: 'Login' | 'Register') {
        this.viewForm = form;
    }

    setMessage(str: string) {
        this.message = str;
    }

    async login(email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            this.setMessage(e.response?.data?.message);
        } finally {
            this.setLoading(false);
            this.setMessage('');
        }
    }

    async register(email: string, password: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.register(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.setViewForm('Login');
        } catch (e: any) {
            this.setMessage(e.response?.data?.message);
        } finally {
            this.setLoading(false);
            this.setMessage('');
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            this.setMessage(e.response?.data?.message);
        } finally {
            this.setMessage('');
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${AUTH_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            this.setMessage(e.response?.data?.message);
        } finally {
            this.setLoading(false);
            this.setMessage('');
        }
    }
}