import { Avatar, Grid, IconButton } from '@mui/material'
import React from 'react'
import PublicIcon from '@mui/icons-material/Public';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';

type Props = {}

const HeadTimeLine = (props: Props) => {
    return (
        <Grid container className='flex items-center' columnSpacing={1}>
            <Grid item lg={1} className='flex justify-center'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item lg={7}>
                <div>
                    <div className='mb-1'>
                        <span className='font-medium'>Tran Ngoc</span>
                        <span>added new 3 photos</span>
                    </div>
                    <div className='flex gap-3 items-center text-secondary' style={{ fontSize: 13 }}>
                        <span
                            className='dot-after'
                            style={{ lineHeight: 1.3 }}
                        >
                            3d
                        </span>
                        <PublicIcon style={{ fontSize: 13 }} />
                    </div>
                </div>
            </Grid>
            <Grid item lg={4}>
                <div className='flex justify-end gap-2 items-center'>
                    <div>
                        <IconButton size='small'>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton size='small'>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </Grid>

        </Grid>
    )
}

export default HeadTimeLine