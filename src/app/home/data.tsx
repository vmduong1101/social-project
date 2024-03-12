import gamingVideo from '@/public/images/controller.png'
import events from '@/public/images/event.png'
import feeds from '@/public/images/feed.png'
import friends from '@/public/images/friends.png'
import groups from '@/public/images/group.png'
import market from '@/public/images/market.png'
import messages from '@/public/images/messenger.png'
import save from '@/public/images/save.png'
import shortcutLol from '@/public/images/short_cut_lol.jpg'
import shortcutPod from '@/public/images/short_cut_pod.jpg'
import memories from '@/public/images/sticky-notes.png'
import watch from '@/public/images/watch.png'
import user1 from '@/public/honkai-user/1.jpg'
import user2 from '@/public/honkai-user/2.jpg'
import user3 from '@/public/honkai-user/3.jpg'
import user4 from '@/public/honkai-user/4.jpg'
import user5 from '@/public/honkai-user/5.jpg'
import user6 from '@/public/honkai-user/6.jpg'
import user7 from '@/public/honkai-user/7.jpg'
import user8 from '@/public/honkai-user/8.jpg'
import user9 from '@/public/honkai-user/9.jpg'
import user10 from '@/public/honkai-user/10.jpg'
import user11 from '@/public/honkai-user/11.jpg'
import user12 from '@/public/honkai-user/12.jpg'
import user13 from '@/public/honkai-user/13.jpg'
import user14 from '@/public/honkai-user/14.jpg'

import { EnumItemMenu, ItemMenu } from '@/src/common/components/li-item'


export const groupDataMenu: ItemMenu[] = [
    {
        id: EnumItemMenu.Friends,
        icon: friends,
        name: 'Friends'
    },
    {
        id: EnumItemMenu.Watch,
        icon: watch,
        name: 'Video'
    },
    {
        id: EnumItemMenu.Groups,
        icon: groups,
        name: 'Groups'
    },
    {
        id: EnumItemMenu.Market,
        icon: market,
        name: 'Marketplace'
    },
    {
        id: EnumItemMenu.Memories,
        icon: memories,
        name: 'Memories'
    },
    {
        id: EnumItemMenu.Saved,
        icon: save,
        name: 'Saved'
    },
    {
        id: EnumItemMenu.Feeds,
        icon: feeds,
        name: 'Feeds'
    },
    {
        id: EnumItemMenu.Events,
        icon: events,
        name: 'Events'
    },
    {
        id: EnumItemMenu.Messages,
        icon: messages,
        name: 'Messages'
    },
    {
        id: EnumItemMenu.GamingVideo,
        icon: gamingVideo,
        name: 'Gaming Videos'
    },
]

export const groupDataShortcut: ItemMenu[] = [
    {
        id: 'shortcutLol' as EnumItemMenu,
        icon: shortcutLol,
        name: 'Friends'
    },
    {
        id: 'shortcutPod' as EnumItemMenu,
        icon: shortcutPod,
        name: 'Video'
    },
]

export const groupContact: ItemMenu[] = [
    {
        id: 1,
        icon: user1,
        name: 'Linh Nhi',
        image_url: '/honkai-user/1.jpg'
    },
    {
        id: 2,
        icon: user2,
        name: 'Trọng Tín',
        image_url: '/honkai-user/2.jpg'
    },
    {
        id: 3,
        icon: user3,
        name: 'Mai Phương',
        image_url: '/honkai-user/3.jpg'
    },
    {
        id: 4,
        icon: user4,
        name: 'Đức Anh',
        image_url: '/honkai-user/4.jpg',
    },
    {
        id: 5,
        icon: user5,
        name: 'Hà Lan',
        image_url: '/honkai-user/5.jpg',
    },
    {
        id: 6,
        icon: user6,
        name: 'Quốc Bảo',
        image_url: '/honkai-user/6.jpg',
    }
    ,
    {
        id: 7,
        icon: user7,
        name: 'Hoài Thương',
        image_url: '/honkai-user/7.jpg',
    },
    {
        id: 8,
        icon: user8,
        name: 'Tuấn Kiệt',
        image_url: '/honkai-user/8.jpg',
    },
    {
        id: 9,
        icon: user9,
        name: 'Minh Huyền',
        image_url: '/honkai-user/9.jpg',
    },
    {
        id: 10,
        icon: user10,
        name: 'Đức Long',
        image_url: '/honkai-user/10.jpg',
    },
    {
        id: 11,
        icon: user11,
        name: 'Ngọc Ánh',
        image_url: '/honkai-user/11.jpg',
    },
    {
        id: 12,
        icon: user12,
        name: 'Hoàng Nam',
        image_url: '/honkai-user/12.jpg',
    },
    {
        id: 13,
        icon: user13,
        name: 'Thanh Thảo',
        image_url: '/honkai-user/13.jpg',
    }
    ,
    {
        id: 14,
        icon: user14,
        name: 'Quang Hải',
        image_url: '/honkai-user/14.jpg',
    }
]