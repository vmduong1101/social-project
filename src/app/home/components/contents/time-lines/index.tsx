import { Box, Grid } from '@mui/material'
import React from 'react'
import HeadTimeLine from './head'
import BodyTimeLine from './body'
import ActionTimeLine from './action'

type Props = {}

const TimeLines = (props: Props) => {
    return (
        <Box>
            <Grid
                container
                rowSpacing={4}
            >
                <Grid item lg={12}>
                    <HeadTimeLine />
                </Grid>
                <Grid item lg={12}>
                    <BodyTimeLine />
                </Grid>
                <Grid item lg={12}>
                    <ActionTimeLine />
                </Grid>
            </Grid>
        </Box>
    )
}

export default TimeLines