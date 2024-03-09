import feel from '@/public/images/happy.png';
import picture from '@/public/images/picture.png';
import stream from '@/public/images/video-stream.png';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Card, CardContent, Grid, IconButton, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import { EnumItemMenu, ItemMenu } from '../../menu/data';
import ItemAction from '../../menu/groups/item';

type Props = {}

const dataPostAction: ItemMenu[] = [
    {
        id: EnumItemMenu.Stream,
        name: 'Live video',
        icon: picture
    },
    {
        id: EnumItemMenu.Picture,
        name: 'Photo/video',
        icon: stream
    },
    {
        id: EnumItemMenu.Feel,
        name: 'Feeling/activity',
        icon: feel
    }
]

const Post = (props: Props) => {
    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item lg={12} className='flex justify-between'>
                        <div>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </div>
                        <div>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                                <IconButton sx={{ p: '10px' }} aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search Google Maps"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                    <DirectionsIcon />
                                </IconButton>
                            </Paper>
                        </div>
                    </Grid>
                    <Divider className="w-full bg-gray-divider my-2" />
                    <Grid item lg={12}>
                        <Grid container>
                            {dataPostAction.map((item, index) => {
                                return (
                                    <Grid item lg={4} key={index} className='flex'>
                                        <ItemAction item={item} className='bg-bg-card' />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}

export default Post