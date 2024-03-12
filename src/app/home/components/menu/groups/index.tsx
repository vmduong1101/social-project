import { Box, Grid } from '@mui/material'
import SeeMore from './see-more'
import LiItemAction, { ItemMenu } from '@/src/common/components/li-item'
import LiProfile from './li-profile'

type Props = {
    data: ItemMenu[]
}

const GroupsMenu = ({ data }: Props) => {
    return (
        <Box>
            <Grid container justifyContent={"center"} className='h-full mt-3'>
                <Grid item lg={12}>
                    <LiProfile />
                </Grid>
                {data.map((item, index) => (
                    <Grid item lg={12} key={index}>
                        <LiItemAction item={item} />
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