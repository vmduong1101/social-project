import { Box, Grid } from '@mui/material'
import LiItemAction from '@/src/common/components/li-item'
import { groupContact, groupDataMenu } from '../../data'

type Props = {}

const Contact = (props: Props) => {
    return (
        <Box>
            <Grid container>
                <div>
                    <p className='text-text-dark text-base font-medium'>Contact</p>
                </div>
            </Grid>
            <Grid container className='sticky top-14 left-4 overflow-auto'>
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
        </Box>
    )
}

export default Contact