'use client'
import { AccountCircle } from "@mui/icons-material";
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { AppBar, Grid, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/logo_social.svg";
import { AuthProvider } from "@/src/context/auth-context";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [value, setValue] = useState(1);

    useEffect(() => {

    }, [])

    const handleChangeTabs = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <AuthProvider>
            <section>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container sx={{ flexGrow: 1 }}>
                            <Grid item xs={4} display={"flex"} justifyContent={"flex-start"}>
                                <a href="/" className="flex items-center gap-2 w-12 h-12 rounded bg-slate-50 justify-center hover:opacity-80 hover:transition-opacity">
                                    <Image src={logo} alt="logo" width={35} height={35} className="rounded-full shadow-cyan-500" />
                                </a>
                            </Grid>
                            <Grid item xs={4}>
                                <Tabs
                                    value={value}
                                    indicatorColor="secondary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="action tabs example"
                                    onChange={handleChangeTabs}
                                >
                                    <Tab label={<HomeRoundedIcon color="secondary" />} value={1} />
                                    <Tab label={<OndemandVideoRoundedIcon color="secondary" />} value={2} />
                                    <Tab label={<StorefrontRoundedIcon color="secondary" />} value={3} />
                                </Tabs>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="flex justify-end items-center gap-2 h-full">
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <WidgetsIcon />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <CircleNotificationsRoundedIcon />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {children}
            </section >
        </AuthProvider>
    )
}
