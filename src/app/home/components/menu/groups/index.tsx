import { Box, Grid } from '@mui/material'
import ItemAction from './item'
import { ItemMenu } from '../data'
import SeeMore from './see-more'

type Props = {
    data: ItemMenu[]
}

const GroupsMenu = ({ data }: Props) => {
    return (
        <Box>
            <Grid container justifyContent={"center"}>
                {data.map((item, index) => (
                    <Grid item lg={12} key={index}>
                        <ItemAction item={item} />
                    </Grid>
                ))}
                <Grid item lg={12}>
                    <SeeMore />
                </Grid>
            </Grid>
        </Box>
    )
}

export default GroupsMenu