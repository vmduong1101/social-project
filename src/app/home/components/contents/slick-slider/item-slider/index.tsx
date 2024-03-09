import photo from '@/public/photo.avif'
import { Box } from '@mui/material'
import Image from 'next/image'

type Props = {}

const ItemSlider = (props: Props) => {
    return (
        <Box>
            <Image
                src={photo}
                alt='Picture of the author'
                width={140}
                height={210}
                style={{
                    borderRadius: 8,
                }}
            />
        </Box>
    )
}

export default ItemSlider