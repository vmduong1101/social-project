'use client'

import dynamic from 'next/dynamic'
import Loading from '../loading'

const LoginPage = dynamic(() => import('.'), { loading: () => <Loading />, ssr: false })

const Login = () => {

    return (
        <LoginPage />
    )
}

export default Login