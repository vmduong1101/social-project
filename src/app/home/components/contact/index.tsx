import { Menu } from '@mui/icons-material'
import { Card, CardContent, Grid } from '@mui/material'

type Props = {}

const Contact = (props: Props) => {
    return (
        <Grid container className='sticky top-16 right-0'>
            <Grid item xs={12} className='flex justify-end'>
                <Card sx={{ minWidth: 300 }}>
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

export default Contact