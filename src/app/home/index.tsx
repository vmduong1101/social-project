'use client'

import { Grid } from "@mui/material"
import Contact from "./components/contact"
import Content from "./components/contents"
import Menu from "./components/menu"

const Home = () => {

    return (
        <Grid container className="px-3" bgcolor={"#18191a"}>
            <Grid item lg={2.5} sm={2}>
                <Menu />
            </Grid>
            <Grid item lg={7} sm={8} className="flex flex-row justify-center items-stretch px-8">
                <Content />
            </Grid>
            <Grid item lg={2.5} sm={2}>
                <Contact />
            </Grid>
        </Grid>
    )
}

export default Home