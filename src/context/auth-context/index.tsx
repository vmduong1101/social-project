import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useMemo } from 'react'

type Props = {
    children: React.ReactNode
}

export type AuthContext = {
    user: any
    login: (user: any) => void
    logout: () => void
    register: (user: any) => void
}

const initAuth = {
    user: null,
    login: (user: any) => { },
    logout: () => { },
    register: (user: any) => { }
}


const ContextProvider = createContext(initAuth)

const AuthProvider = ({ children }: Props) => {
    const route = useRouter()
    const token = localStorage.getItem('token')

    try {
        if (!token) {
            localStorage.removeItem('token')
            route.push('/')
        }
    } catch (error) {
        throw new Error('Error in Auth Provider')
    }


    const auth = useMemo(() => {
        return {
            user: null,
            login: (user: any) => { },
            logout: () => { },
            register: (user: any) => { }
        }
    }, [])

    if (!token) return <div>Checking...</div>

    return (
        <ContextProvider.Provider value={auth}>
            {children}
        </ContextProvider.Provider>
    )
}

const useAuthContext = () => useContext(ContextProvider)

export { AuthProvider, useAuthContext }
