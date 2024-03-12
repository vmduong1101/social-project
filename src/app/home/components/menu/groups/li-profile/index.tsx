import LiItemAction from '@/src/common/components/li-item'
import { useAuthContext } from '@/src/context/auth-context'
import React from 'react'

type Props = {}

const LiProfile = (props: Props) => {
    const { currentUser } = useAuthContext()
    return (
        <div>
            <LiItemAction item={{
                id: 'profile',
                name: currentUser?.full_name,
                image_url: currentUser?.picture as any,
            }} />
        </div>
    )
}

export default LiProfile