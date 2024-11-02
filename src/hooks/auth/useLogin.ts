import { User } from "@/interfaces/user";
import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const authService = new AuthService("http://localhost:3001/");
        const response = await authService.login(email, password);
        if (response){
            Cookies.set("currentUser", JSON.stringify(response.user));
            Cookies.set("token", response.access_token);
        }

        return response.user as User;
    }

    return {login};
};