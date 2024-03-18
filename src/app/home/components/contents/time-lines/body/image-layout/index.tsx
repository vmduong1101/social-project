import { Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'

type Props = {
    images: string[]
}

const ImageLayout = ({ images }: Props) => {
    const length = images?.length
    return (
        <Grid container className='flex justify-center'>
            {length === 1 ?
                <Grid item lg={12} className='flex justify-center'>
                    <Image src="https://via.placeholder.com/500" alt="placeholder" width={400} height={400} />
                </Grid>
                : length === 2 ?
                    images.map((image, index) => (
                        <Grid item lg={6} key={index}>
                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                        </Grid>
                    ))
                    : length === 3 ?
                        <Grid item lg={12} className='flex justify-center'>
                            <Grid container className='flex justify-center'>
                                <Grid item lg={12}>
                                    <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                </Grid>
                                <Grid item lg={6}>
                                    <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                </Grid>
                                <Grid item lg={6}>
                                    <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                </Grid>
                            </Grid>
                        </Grid>
                        : length === 4 ?
                            <Grid item lg={12} className='flex justify-center'>
                                <Grid container className='flex justify-center'>
                                    <Grid item lg={12}>
                                        <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            : length === 5 ?
                                <Grid item lg={12} className='flex justify-center'>
                                    <Grid container className='flex justify-center'>
                                        <Grid item lg={6}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                : <Grid item lg={12} className='flex justify-center'>
                                    <Grid container className='flex justify-center'>
                                        <Grid item lg={6}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Image src="https://via.placeholder.com/500" alt="placeholder" width={100} height={100} />
                                        </Grid>
                                    </Grid>
                                </Grid>
            }
        </Grid>
    )
}

export default ImageLayout