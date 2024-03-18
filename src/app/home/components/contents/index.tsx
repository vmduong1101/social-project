import { Menu } from '@mui/icons-material'
import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import DynamicSlides from './slick-slider'
import Post from './post'
import TimeLines from './time-lines'

type Props = {}

const Content = (props: Props) => {
    return (
        <Grid
            container
            rowGap={2}
            className="mt-3"
            style={{ width: 590 }}
        >
            <Grid item lg={12} className='flex justify-center'>
                <DynamicSlides />
            </Grid>
            <Grid item lg={12}>
                <Post />
            </Grid>
            <Grid item lg={12}>
                <Card>
                    <CardContent>
                        <TimeLines />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Content