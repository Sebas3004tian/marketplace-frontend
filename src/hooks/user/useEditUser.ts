import { User } from "@/interfaces/user";
import { UserService } from "@/services/user.service";
import Cookies from "js-cookie";

export const useEditUser = () => {
    const editUser = async (id: string,fullName: string, email: string, address:string) => {
        const userService = new UserService("http://localhost:3001/");
        const response = await userService.editUser(id,fullName, email, address);
        console.log(response);
        if (response){
            Cookies.set("currentUser", JSON.stringify(response));
        }

        return response as User;
    }

    return {editUser};
};