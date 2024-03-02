import { Menu } from '@mui/icons-material'
import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import DynamicSlides from './slick-slider'

type Props = {}

const Content = (props: Props) => {
    return (
        <Grid container rowGap={6}>
            <Grid item xs={12}>
                <DynamicSlides />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        {Array(10).fill(0).map((_, index) => (
                            <Grid item xs={12} key={index}>
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