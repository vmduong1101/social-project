import { Avatar, Badge, Grid, styled } from '@mui/material'
import Image, { StaticImageData } from 'next/image'

export enum EnumItemMenu {
    Friends = 'friends',
    Groups = 'groups',
    Watch = 'watch',
    Market = 'market',
    Memories = 'memories',
    Saved = 'saved',
    Feeds = 'feeds',
    Events = 'events',
    Stream = 'stream',
    Picture = 'picture',
    Feel = 'feel',
    Messages = 'messages',
    GamingVideo = 'gaming-video',
}

export interface ItemMenu {
    id: EnumItemMenu | any
    icon?: StaticImageData
    name: string
    image_url?: string
}

type Props = {
    item: ItemMenu
    className?: string
    badge?: boolean
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '90%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const LiItemAction = (props: Props) => {
    const { item, className, badge } = props

    return (
        <Grid
            container
            alignItems={"center"}
            bgcolor={"#18191a"}
            className={`hover:bg-gray-hover p-2 cursor-pointer w-full ${className}`}
            columnSpacing={2}
            style={{ borderRadius: 8 }}
        >
            <Grid item lg={2} style={{ paddingLeft: 0 }}>
                <div className='flex items-center justify-center'>
                    {badge ?
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt={item?.name} src={item?.image_url} className='h-7 w-7' />
                        </StyledBadge>
                        : item?.icon ?
                            <Image
                                src={item?.icon as StaticImageData}
                                alt={item?.name}
                                height={28}
                                className='rounded-md'
                            /> : <Avatar alt={item?.name} src={item?.image_url} className='h-7 w-7' />
                    }
                </div>
            </Grid>
            <Grid item lg={10} fontSize={15} style={{ paddingLeft: 4 }}>
                <div className='font-medium text-text-dark'>
                    {item?.name}
                </div>
            </Grid>
        </Grid>
    )
}

export default LiItemAction