import {cookies} from "next/headers";

export const useUser = () => {
    const cookieStore = cookies();
    const user = cookieStore.get("user");
    if (!user) return null;

    return JSON.parse(user.value);
}