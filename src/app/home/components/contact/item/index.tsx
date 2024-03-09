import { Avatar, Grid } from '@mui/material'
import React from 'react'

type Props = {}

const ItemContact = (props: Props) => {
    return (
        <Grid container alignItems={"center"} bgcolor={"#18191a"}>
            <Grid item lg={2}>
                <div className='flex items-center justify-center'>
                    <Avatar />
                </div>
            </Grid>
            <Grid item lg={10}>
                <div className='font-medium text-text-dark'>
                    Minh Duong
                </div>
            </Grid>
        </Grid>
    )
}

export default ItemContact