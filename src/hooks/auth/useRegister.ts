import { User } from "@/interfaces/user";
import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";

export const useRegister = () => {
    const register = async (fullName: string, email: string, password: string, address: string, roleName: 'buyer' | 'seller') => {
        const authService = new AuthService("https://marketplace-backend-production-d4eb.up.railway.app/");
        const response = await authService.register(fullName, email, password, address, roleName);

        if (response) {
            Cookies.set("currentUser", JSON.stringify(response.user));
            Cookies.set("token", response.access_token);
        }

        return response.user as User;
    }

    return { register };
};
