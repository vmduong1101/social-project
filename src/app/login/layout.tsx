'use client'

import { useAuthContext } from "@/src/context/auth-context"
import { isEmpty } from "lodash"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { token, currentUser } = useAuthContext()

    useEffect(() => {
        const isValidAuth = !isEmpty(token) && !isEmpty(currentUser)
        if (isValidAuth) {
            router.replace('/')
        } else {
            router.replace('/login')
        }
    }, [token, currentUser, router])

    return (
        <section>
            {children}
        </section>
    )
}
