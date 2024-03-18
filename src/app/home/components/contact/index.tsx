import LiItemAction from '@/src/common/components/li-item'
import { Box, Grid } from '@mui/material'
import { groupContact } from '../../data'

type Props = {}

const Contact = (props: Props) => {
    return (
        <Grid
            container
            className="sticky top-14 left-4 overflow-auto invisible transition-all scrollbar-cs 
                hover:visible focus:visible hover:transition-all"
            style={{ maxHeight: 'calc(100vh - 56px)' }}
        >
            <Grid item lg={12} className="h-full visible">
                <Grid item lg={12}>
                    <div>
                        <p className='text-text-dark text-base font-medium'>Contact</p>
                    </div>
                </Grid>
                <Grid item lg={12}>
                    <Box>
                        <Grid container justifyContent={"center"}>
                            {groupContact.map((item, index) => (
                                <Grid item lg={12} key={index}>
                                    <LiItemAction item={item} badge={true} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Contact