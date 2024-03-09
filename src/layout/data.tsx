import Groups2Icon from '@mui/icons-material/Groups2';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StoreIcon from '@mui/icons-material/Store';

enum EnumTabValue {
    Home = 'home',
    Video = 'video',
    Store = 'store',
    Group = 'group',
    Gaming = 'gaming',
}

export const dataTabContent = [
    {
        id: EnumTabValue.Home,
        icon: <HomeRoundedIcon fontSize="medium" />
    },
    {
        id: EnumTabValue.Video,
        icon: <OndemandVideoRoundedIcon fontSize="medium" />
    },
    {
        id: EnumTabValue.Store,
        icon: <StoreIcon fontSize="medium" />
    },
    {
        id: EnumTabValue.Group,
        icon: <Groups2Icon fontSize="medium" />
    },
    {
        id: EnumTabValue.Gaming,
        icon: <SportsEsportsIcon fontSize="medium" />
    },
]