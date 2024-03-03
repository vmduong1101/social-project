'use client'

import { LOGIN } from '@/src/common/graphql/auth/mutations/mutation-login'
import { useAuthContext } from '@/src/context/auth-context'
import { useMutation } from '@apollo/client'
import { Avatar, Button, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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
        <Grid
            container
            rowSpacing={1}
            alignItems="center"
            justifyContent='center'
            height='calc(100vh - 56px)'
            sx={{ flexGrow: 1 }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    rowSpacing={3}
                    textAlign={'center'}
                >
                    <Grid item xs={12} width={100} display={'flex'} justifyContent={'center'}>
                        <Avatar alt="Social Media" src="../../../public/vercel.svg" />
                    </Grid>
                    <Grid item xs={12} width={100}>
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
                    <Grid item xs={12} width={100}>
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
                    <Grid item xs={12} width={100}>
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid >
    )
}

export default LoginPage