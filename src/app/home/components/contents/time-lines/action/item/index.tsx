
export enum EnumItemAction {
    Like = 'like',
    Comment = 'comment',
    Share = 'share',
}

export interface IItemAction {
    id: EnumItemAction | any
    icon?: any
    name: string
}

type Props = {
    item: IItemAction
    className?: string
    badge?: boolean
}

const ItemAction = (props: Props) => {
    const { item, className, badge } = props

    return (
        <div
            className={`hover:bg-gray-hover cursor-pointer flex items-center justify-center w-full gap-2 ${className}`}
        >
            <div className='flex items-center justify-center'>
                {item?.icon}
            </div>
            <div className='font-medium text-text-dark'>
                {item?.name}
            </div>
        </div>
    )
}

export default ItemAction