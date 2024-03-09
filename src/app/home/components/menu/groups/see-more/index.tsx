import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Grid, IconButton } from '@mui/material';
import { useState } from 'react';

type Props = {}


const SeeMore = (props: Props) => {
    const [expanded, setExpanded] = useState(false)

    const handleExpanded = () => {
        setExpanded(!expanded)
    }
    const icon = expanded ? <ExpandLessIcon fontSize='small' /> : <ExpandMoreOutlinedIcon fontSize='small' />
    return (
        <Grid
            container
            alignItems={"center"}
            bgcolor={"#18191a"}
            className='hover:bg-gray-hover p-2 rounded-md cursor-pointer'
            onClick={handleExpanded}
        >
            <Grid item lg={2}>
                <div className='flex items-center justify-center'>
                    <IconButton
                        color="inherit"
                        className='bg-bg-icon-secondary h-7 w-7'
                    >
                        {icon}
                    </IconButton>
                </div>
            </Grid>
            <Grid item lg={10} fontSize={15}>
                <div className='font-medium text-text-dark'>
                    See more
                </div>
            </Grid>
        </Grid>
    )
}

export default SeeMore