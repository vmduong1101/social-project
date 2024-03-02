'use client'

import { Grid } from "@mui/material"
import MenuActions from "./components/menu-actions"
import dynamic from "next/dynamic"

const Content = dynamic(() => import('./components/contents'), { loading: () => <p>Loading...</p> })
const Contact = dynamic(() => import('./components/contact'), { loading: () => <p>Loading...</p> })

type Props = {}

const Home = (props: Props) => {
    return (
        <Grid container className="pt-6 px-6">
            <Grid item xs={3}>
                <MenuActions />
            </Grid>
            <Grid item xs={6}>
                <Content />
            </Grid>
            <Grid item xs={3}>
                <Contact />
            </Grid>
        </Grid>
    )
}

export default Home