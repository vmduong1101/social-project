import { Box, Card, CardContent, Grid } from '@mui/material'
import ItemAction from './item'

type Props = {}

const Menu = (props: Props) => {
    return (
        <Grid container className='sticky top-20 left-4'>
            <Grid item xs={12}>
                <Box>
                    <Grid container gap={2} justifyContent={"center"}>
                        {Array(10).fill(0).map((_, index) => (
                            <Grid item xs={12} key={index}>
                                <ItemAction />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Menu