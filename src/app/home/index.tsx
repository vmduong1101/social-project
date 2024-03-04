'use client'

import { Grid } from "@mui/material"
import dynamic from "next/dynamic"

const Menu = dynamic(() => import('./components/menu'), { loading: () => <p>Loading...</p> })
const Content = dynamic(() => import('./components/contents'), { loading: () => <p>Loading...</p> })
const Contact = dynamic(() => import('./components/contact'), { loading: () => <p>Loading...</p> })


const Home = () => {

    return (
        <Grid container className="px-3" bgcolor={"#18191a"}>
            <Grid item xs={3}>
                <Menu />
            </Grid>
            <Grid item xs={6} className="flex flex-row justify-center items-stretch px-8">
                <Content />
            </Grid>
            <Grid item xs={3}>
                <Contact />
            </Grid>
        </Grid>
    )
}

export default Home