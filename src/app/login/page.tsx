'use client'

import Loader from '@/src/common/components/loading'
import dynamic from 'next/dynamic'

const LoginPage = dynamic(() => import('./index'), { loading: () => <Loader />, ssr: false })

const Login = () => {

    return (
        <LoginPage />
    )
}

export default Login