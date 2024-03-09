import events from '@/public/images/event.png'
import feeds from '@/public/images/feed.png'
import friends from '@/public/images/friends.png'
import groups from '@/public/images/group.png'
import market from '@/public/images/market.png'
import save from '@/public/images/save.png'
import shortcutLol from '@/public/images/short_cut_lol.jpg'
import shortcutPod from '@/public/images/short_cut_pod.jpg'
import memories from '@/public/images/sticky-notes.png'
import watch from '@/public/images/watch.png'

import { StaticImageData } from 'next/image'

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
}

export interface ItemMenu {
    id: EnumItemMenu
    icon: StaticImageData
    name: string
}

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