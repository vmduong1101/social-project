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
    const { token } = useAuthContext()

    useEffect(() => {
        const isValidAuth = !isEmpty(token)
        if (isValidAuth) {
            router.replace('/')
        } else {
            router.replace('/login')
        }
    }, [token, router])

    return (
        <section>
            {children}
        </section>
    )
}
