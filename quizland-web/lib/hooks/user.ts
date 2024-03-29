import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import type {User} from "#types";

/**
 * Return the user object from the cookie
 * */
export function useUser() {
    const [user, setUser] = useState<User | undefined | null>(undefined)
    const [cookie, setCookie] = useState<string | undefined>(undefined)
    useEffect(() => {
        const u = getCookie("user");
        if (u) {
            setUser(JSON.parse(u + ''));
        }
	else setUser(null);
    }, [cookie])

    useEffect(() => setCookie(document.cookie), [])
    return user as User | undefined | null
}

/**
 * Return the token from the cookie
 * \*surprisingly\*
 * */
export function useToken() {
    const [token, setToken] = useState("")

    useEffect(() => {
        const t = getCookie("token")
        if (t) {
            setToken(t + '')
        }
    }, [])
    return token
}
