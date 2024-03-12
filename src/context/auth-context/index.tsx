'use client'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode
}

export type CurrentUser = {
    email?: string
    full_name?: string
    role?: string
    picture?: string
    account?: string
}

export type AuthContext = {
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
    currentUser: CurrentUser | any
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | any>>
}

const ISSERVER = typeof window === "undefined"

const ContextProvider = createContext({ currentUser: {} } as AuthContext)
const AuthProvider = ({ children }: Props) => {
    const router = useRouter()

    const userLocal = !ISSERVER ? JSON.parse(localStorage.getItem('social-user') || '{}') : {}
    const tokenLocal = !ISSERVER ? localStorage.getItem('token') : ''

    const [token, setToken] = useState(tokenLocal)
    const [currentUser, setCurrentUser] = useState(userLocal as CurrentUser)


    useEffect(() => {
        if (!ISSERVER) {
            const path = window?.location?.pathname || ''
            if (['/auth/google/callback', '/auth/microsoft/callback'].includes(path)) return
            const isValidAuth = !isEmpty(token)
            if (!isValidAuth) {
                router.replace('/login')
            }
        }
    }, [token, router])

    return (
        <ContextProvider.Provider value={{ token, setToken, currentUser, setCurrentUser }}>
            {children}
        </ContextProvider.Provider>
    )
}

const useAuthContext = () => useContext(ContextProvider)

export { AuthProvider, useAuthContext }

