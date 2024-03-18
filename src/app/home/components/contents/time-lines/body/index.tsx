import React from 'react'
import './styles.css'
import { Box, Grid } from '@mui/material';
import ImageLayout from './image-layout';
type Props = {}

const BodyTimeLine = (props: Props) => {
    const maxImageCount = 1;
    const imageCount = 8;

    const images = Array.from({ length: imageCount }, (_, index) => `https://via.placeholder.com/150/0000FF/808080?text=Image+${index + 1}`);

    const imageElements = images.slice(0, maxImageCount)
    return (
        <Box>
            <Grid container spacing={2} className='flex justify-center'>
                <ImageLayout images={imageElements} />
            </Grid>
        </Box>
    );
}

export default BodyTimeLine