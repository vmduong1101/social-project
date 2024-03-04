'use client'

import { LOGIN } from '@/src/common/graphql/auth/mutations/mutation-login'
import { useAuthContext } from '@/src/context/auth-context'
import { useMutation } from '@apollo/client'
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import './styles.css'

type Props = {}

interface FormInput {
    userName: string
    password: any
}

const LoginPage = (props: Props) => {
    const router = useRouter()
    const [login] = useMutation(LOGIN);
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit } = useForm<FormInput>()
    const { setCurrentUser, setToken } = useAuthContext()

    const onSubmit: SubmitHandler<FormInput> = (data) => login({
        variables: {
            user_name: data.userName,
            password: data.password
        },
        onCompleted(data) {
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
                <Card sx={{ minWidth: 275 }}>
                    <CardContent
                        sx={{
                            padding: '40px 20px',
                        }}
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Box
                            width={396}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid
                                    container
                                    rowSpacing={3}
                                    textAlign={'center'}
                                >
                                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                        <Avatar alt="Social Media" src="../../../public/vercel.svg" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Username"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            placeholder='Username or Email Address'
                                            autoComplete='off'
                                            {...register('userName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Password"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            placeholder='Password'
                                            type='password'
                                            autoComplete='new-password'
                                            {...register('password')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                        >
                                            Sign In
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <a href='#' className='font-medium no-underline'>
                                            Forgotten password?
                                        </a>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Divider className='w-full' />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Button
                                            size="large"
                                            variant="contained"
                                            fullWidth
                                            className='bg-green-600 w-64'
                                        >
                                            Create New Account
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </Grid >
            <div className='absolute h-full'>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
            </div>
        </Box>
    )
}

export default LoginPage