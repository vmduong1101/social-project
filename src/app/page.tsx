'use client'

import { useMutation } from '@apollo/client'
import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LOGIN } from '../common/graphql/auth/mutations/mutation-login'

type Props = {}

interface FormInput {
    userName: string
    password: any
}

const Login = (props: Props) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit } = useForm<FormInput>()
    const [login, { loading }] = useMutation(LOGIN);

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
                localStorage.setItem('token', data?.login?.access_token || null)
                router.push('/home')
            }
        },
    })

    return (
        <Grid
            container
            rowSpacing={1}
            alignItems="center"
            justifyContent='center'
            height='100vh'
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
                        <LoadingButton
                            size="large"
                            loading={loading}
                            type="submit"
                            variant="contained"
                            fullWidth
                            classes={{
                                loading: 'mui-btn-loading',
                            }}
                        >
                            Sign In
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Grid >
    )
}

export default Login