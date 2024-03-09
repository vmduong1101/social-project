import { Divider, Grid } from "@mui/material"
import { groupDataMenu, groupDataShortcut } from "./data"
import GroupsMenu from "./groups"


const Menu = () => {
    return (
        <Grid container className='sticky top-top-18 left-4'>
            <Grid item lg={12}>
                <GroupsMenu data={groupDataMenu} />
            </Grid>
            <Divider className="w-full bg-gray-divider my-2" />
            <Grid item lg={12}>
                <GroupsMenu data={groupDataShortcut} />
            </Grid>
        </Grid>
    )
}

export default Menu