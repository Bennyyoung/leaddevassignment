import { useState } from "react"

export default function useToken() {
    const getToken = () => {
        const tokenString: string | null = sessionStorage.getItem('token' as string)
        // console.log('tokenString',JSON.parse(tokenString))
        const userToken = JSON.parse(tokenString as string )

        return userToken?.data.token
    }

    const [token, setToken] = useState(getToken());


    const saveToken = (userToken: any) => {
        sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    return {
        setToken: saveToken,
        token
    }
}