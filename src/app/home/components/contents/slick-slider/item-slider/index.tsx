import { Card, CardContent } from '@mui/material'
import Image from 'next/image'
import photo from '@/public/photo.avif'

type Props = {}

const ItemSlider = (props: Props) => {
    return (
        <Card className='mx-2'>
            <CardContent className='p-0 pb-0 flex justify-center items-center'>
                <Image
                    src={photo}
                    alt='Picture of the author'
                    width={160}
                    height={210}
                    style={{
                        padding: 5,
                        borderRadius: 10
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default ItemSlider