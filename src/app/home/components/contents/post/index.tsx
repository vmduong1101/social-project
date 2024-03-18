import feel from '@/public/images/happy.png';
import picture from '@/public/images/picture.png';
import stream from '@/public/images/video-stream.png';
import LiItemAction, { EnumItemMenu, ItemMenu } from '@/src/common/components/li-item';
import { useAuthContext } from '@/src/context/auth-context';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Card, CardContent, Grid, IconButton, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import ModalCreatePost from './modal-create';
import { useState } from 'react';

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
    const [open, setOpen] = useState(false);
    const { currentUser } = useAuthContext()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item lg={12} className='flex justify-between items-center gap-6'>
                        <div>
                            <Avatar style={{ width: 44, height: 44 }} src={currentUser?.picture}>M</Avatar>
                        </div>
                        <div className='w-full' onClick={handleClickOpen}>
                            <Paper
                                component="form"
                                style={{ backgroundColor: '#3a3b3c', padding: '4px' }}
                                className='rounded-full'
                            >
                                <InputBase
                                    placeholder={`What's on your mind?`}
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    className='px-4 w-full text-white'
                                />
                            </Paper>
                        </div>
                    </Grid>
                    <Divider className="w-full bg-gray-divider my-2" />
                    <Grid item lg={12}>
                        <Grid container>
                            {dataPostAction.map((item, index) => {
                                return (
                                    <Grid item lg={4} key={index} className='flex'>
                                        <LiItemAction item={item} className='bg-bg-card' />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <ModalCreatePost open={open} onClose={handleClose} />
        </Card >
    )
}

export default Post