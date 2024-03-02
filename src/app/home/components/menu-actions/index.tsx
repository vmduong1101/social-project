import { Menu } from '@mui/icons-material'
import { Card, CardContent, Grid, IconButton } from '@mui/material'
import React from 'react'

type Props = {}

const MenuActions = (props: Props) => {
    return (
        <Grid container className='sticky top-16 left-4'>
            <Grid item xs={12}>
                <Card sx={{ maxWidth: 300 }}>
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

export default MenuActions