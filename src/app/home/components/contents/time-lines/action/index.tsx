import { Divider, Grid } from '@mui/material'
import { BiLike } from 'react-icons/bi'
import { RiChat1Line, RiShareForwardLine } from 'react-icons/ri'
import ItemAction, { EnumItemAction, IItemAction } from './item'

type Props = {}

const dataActionTineLine: IItemAction[] = [
    {
        id: EnumItemAction.Like,
        name: 'Like',
        icon: <BiLike size={20} />
    },
    {
        id: EnumItemAction.Comment,
        name: 'Comment',
        icon: <RiChat1Line size={20} />
    },
    {
        id: EnumItemAction.Share,
        name: 'Share',
        icon: <RiShareForwardLine size={20} />
    }
]

const ActionTimeLine = (props: Props) => {
    return (
        <Grid item lg={12}>
            <Grid container>
                <Grid item lg={12}>
                    <Divider className='bg-gray-divider mb-1' />
                </Grid>
                {dataActionTineLine.map((item, index) => {
                    return (
                        <Grid item lg={4} key={index} className='flex justify-center'>
                            <ItemAction item={item} className='bg-bg-card p-2 rounded-lg' />
                        </Grid>
                    )
                })}
                <Grid item lg={12}>
                    <Divider className='bg-gray-divider mt-1' />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ActionTimeLine