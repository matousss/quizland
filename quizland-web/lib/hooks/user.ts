import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import { User } from "quizland-gql/src/__generated__/resolvers-types";

export function useUser() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const u = getCookie("user")
        if (u) {
            setUser(JSON.parse(u + ''))
        }
    }, [])
    return user as User
}

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