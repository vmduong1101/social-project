import { Divider, Grid } from "@mui/material"
import { groupDataMenu, groupDataShortcut } from "../../data"
import GroupsMenu from "./groups"


const Menu = () => {

    return (
        <Grid
            container
            className="sticky top-14 left-4 overflow-auto invisible transition-all scrollbar-cs 
            hover:visible focus:visible hover:transition-all"
            style={{ maxHeight: 'calc(100vh - 56px)' }}
        >
            <Grid item lg={12} className="h-full visible">
                <Grid container>
                    <Grid item lg={12} className="h-full">
                        <GroupsMenu data={groupDataMenu} />
                    </Grid>
                    <Divider className="w-full bg-gray-divider my-2" />
                    <Grid item lg={12}>
                        <p className="text-text-dark mt-0 text-base font-medium">Your shortcuts</p>
                    </Grid>
                    <Grid item lg={12}>
                        <GroupsMenu data={groupDataShortcut} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Menu