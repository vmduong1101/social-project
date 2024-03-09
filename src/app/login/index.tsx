import { useAuthContext } from '@/src/context/auth-context'
import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, Fab, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LOGIN } from './graphql/mutation/mutation-login'
import RegisterAccount from './register'
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { LoadingButton } from '@mui/lab'
import google from '@/public/images/google.png'
import team from '@/public/images/business.png'
import './styles.css'
import Image from 'next/image'
import { GOOGLE_LOGIN } from './graphql/mutation/mutation-google-login'

type Props = {}

interface FormInput {
    email: string
    password: any
}

const LoginPage = (props: Props) => {
    const router = useRouter()

    const { enqueueSnackbar } = useSnackbar();
    const [login, { loading }] = useMutation(LOGIN);
    const { setCurrentUser, setToken } = useAuthContext()
    const [generateAuthGoogle, { loading: googleLoading }] = useMutation(GOOGLE_LOGIN);
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>()

    const [active, setActive] = useState(false)

    const openPopup = (url: string, width: number, height: number) => {
        const leftPosition = (window.screen.width - width) / 2;
        const topPosition = (window.screen.height - height) / 2;
        const popupOptions = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${topPosition}, left=${leftPosition}`;

        window.open(url, 'popupWindow', popupOptions);
        return
    };


    const handleGenerateAuthGoogle = () => {
        return generateAuthGoogle({
            onCompleted(data) {
                openPopup(data?.generateAuthGoogle?.url || '', 500, 600)
            }
        })
    }

    const onSubmit: SubmitHandler<FormInput> = (data) => login({
        variables: {
            email: data.email,
            password: data.password
        },
        onCompleted(data) {
            console.log(data)
            const message = data?.login?.message || ''
            const variant = data?.login?.code === 200 ? 'success' : 'error'
            enqueueSnackbar(message, { variant })
            if (data?.login?.code === 200) {
                const userStringify = JSON.stringify(data?.login?.data || {})
                localStorage?.setItem('token', data?.login?.access_token || null)
                localStorage?.setItem('social-user', userStringify)
                setCurrentUser(data?.login?.data || {})
                setToken(data?.login?.access_token || '')
                router.replace('/')
            }
        },
    })

    const handleToggle = () => {
        setActive(!active)
    }

    return (
        <Box
            position="relative"
        >
            <Grid
                container
                rowSpacing={1}
                alignItems="center"
                justifyContent='center'
                height='calc(100vh - 56px)'
                sx={{ flexGrow: 1 }}
            >
                <div className={`container ${active && 'active'}`}>
                    <div className="form-container sign-up">
                        <RegisterAccount onToggle={handleToggle} />
                    </div>
                    <div className="form-container sign-in">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1>Sign In</h1>
                            <Grid
                                container
                                rowSpacing={2}
                                textAlign={'center'}
                            >
                                <Grid item lg={12}>
                                    <TextField
                                        size='small'
                                        label="Email"
                                        fullWidth
                                        placeholder='Email'
                                        autoComplete='off'
                                        {...register('email')}
                                    />
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField
                                        size='small'
                                        label="Password"
                                        fullWidth
                                        placeholder='Password'
                                        autoComplete='off'
                                        {...register('password')}
                                    />
                                </Grid>
                            </Grid>
                            <LoadingButton
                                size="medium"
                                type='submit'
                                loading={loading}
                                variant="contained"
                                className='w-32 mt-2'
                            >
                                <span>Sign In</span>
                            </LoadingButton>
                            <div className="flex gap-2 mt-5">
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    className='bg-slate-200 shadow-sm'
                                    size='medium'
                                    onClick={handleGenerateAuthGoogle}
                                >
                                    <Image src={google} alt="Google" className='w-6 h-6' />
                                </Fab>
                                <Fab color="primary" aria-label="add" className='bg-slate-200  shadow-sm' size='medium'>
                                    <Image src={team} alt="Team" className='w-6 h-6' />
                                </Fab>
                            </div>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <Button
                                    onClick={handleToggle}
                                    size='small'
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<SwapHorizontalCircleIcon />}
                                >
                                    Sign In
                                </Button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <Button
                                    onClick={handleToggle}
                                    size='small'
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<SwapHorizontalCircleIcon />}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid >
            <div className='absolute h-full'>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
            </div>
        </Box >
    )
}

export default LoginPage