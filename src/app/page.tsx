'use client'

import dynamic from 'next/dynamic'
import Loader from '../common/components/loading'

const Home = dynamic(() => import('./home'), {
    loading: () => <Loader />,
    ssr: false
})

const App = () => {
    return (
        <Home />
    )
}

export default App