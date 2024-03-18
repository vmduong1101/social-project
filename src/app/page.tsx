'use client'

import dynamic from 'next/dynamic'
import Loading from './loading'

const Home = dynamic(() => import('./home'), {
    loading: () => <Loading />,
    ssr: false
})

const App = () => {
    return (
        <Home />
    )
}

export default App