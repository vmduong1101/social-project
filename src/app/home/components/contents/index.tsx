import { Menu } from '@mui/icons-material'
import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import DynamicSlides from './slick-slider'
import Post from './post'

type Props = {}

const Content = (props: Props) => {
    return (
        <Grid
            container
            rowGap={6}
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
                        {Array(20).fill(0).map((_, index) => (
                            <Grid item lg={12} key={index}>
                                <div className='flex items-center'>
                                    <div>
                                        <Menu />
                                    </div>
                                    <div>
                                        <div>
                                            Minh Duong
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Content