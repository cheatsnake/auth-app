import { AxiosResponse } from "axios";
import auth from "../axios";

export default class AuthService {
    static getData(): Promise<AxiosResponse<object>> {
        return auth.get<object>('/data')
    }
}