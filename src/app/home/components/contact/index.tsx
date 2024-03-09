import { Box, Grid } from '@mui/material'
import ItemContact from './item'

type Props = {}

const Contact = (props: Props) => {
    return (
        <Grid container className='sticky top-top-18 right-0'>
            <Grid item lg={12}>
                <Box>
                    <Grid container spacing={2} justifyContent={"center"}>
                        {Array(10).fill(0).map((_, index) => (
                            <Grid item lg={12} key={index}>
                                <ItemContact />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Contact