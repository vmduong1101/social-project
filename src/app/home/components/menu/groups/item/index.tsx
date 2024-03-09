import { Grid } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import { ItemMenu } from '../../data'


type Props = {
    item: ItemMenu
    className?: string
}

const ItemAction = (props: Props) => {
    const { item, className } = props

    return (
        <Grid
            container
            alignItems={"center"}
            bgcolor={"#18191a"}
            className={`hover:bg-gray-hover p-2 rounded-lg cursor-pointer ${className}`}
            columnSpacing={2}
        >
            <Grid item lg={2}>
                <div className='flex items-center justify-center'>
                    <Image src={item?.icon as StaticImageData} alt='Video' height={28} className='rounded-md' />
                </div>
            </Grid>
            <Grid item lg={10} fontSize={15}>
                <div className='font-medium text-text-dark'>
                    {item?.name}
                </div>
            </Grid>
        </Grid>
    )
}

export default ItemAction