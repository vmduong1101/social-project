import { REGISTER } from '@/src/app/login/graphql/mutation/mutation-register';
import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import VerifyDialog from './dialog';
import { atom, useRecoilState } from 'recoil';

interface FormInput {
    firstName: string
    lastName: string
    userName: string
    email: string
    password: any
    rePassword: any
}

type Props = {
    onToggle: () => void
}

export const secondState = atom({
    key: 'secondState',
    default: 1000,
});

export const codeVerifyState = atom({
    key: 'codeVerifyState',
    default: 1000,
});

const RegisterAccount = (props: Props) => {
    const { onToggle } = props
    const { enqueueSnackbar } = useSnackbar();
    const [registerUser, { loading }] = useMutation(REGISTER);
    const [_millisecond, setMillisecond] = useRecoilState(secondState);
    const [_codeVerify, setCodeVerify] = useRecoilState(codeVerifyState);

    const { register, handleSubmit, reset } = useForm<FormInput>()
    const [dataSendEmail, setDataSendEmail] = useState({})

    const [openDialog, setOpenDialog] = useState(false);
    const [userMailData, setUserMailData] = useState({});

    const onRegisterUser: SubmitHandler<FormInput> = (data) => {
        const params = {
            password: data.password,
            re_password: data.rePassword,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email
        }
        setDataSendEmail(params)
        registerUser({
            variables: params,
            onCompleted(data) {
                const message = data?.register?.message || ''
                const variant = data?.register?.code === 200 ? 'success' : 'warning'

                if (data?.register?.code === 200) {
                    setOpenDialog(true)
                    reset()
                    setMillisecond(data?.register?.data?.expires_at)
                    setUserMailData(data?.register?.data)
                    setCodeVerify(data?.register?.data?.code)
                }
                enqueueSnackbar(message, { variant })
            },
        })
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onRegisterUser)}>
                <h1>Create Account</h1>
                <Grid
                    container
                    spacing={2}
                    textAlign={'center'}
                >
                    <Grid item lg={12}>
                        <TextField
                            size='small'
                            label="First Name"
                            fullWidth
                            placeholder='First Name'
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            {...register('firstName')}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            size='small'
                            label="Last Name"
                            fullWidth
                            placeholder='Last Name'
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            {...register('lastName')}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            size='small'
                            label="Email"
                            fullWidth
                            placeholder='Email'
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            {...register('email')}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            size='small'
                            label="Password"
                            fullWidth
                            placeholder='Password'
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            {...register('password')}
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <TextField
                            size='small'
                            type='password'
                            label="Re-Password"
                            fullWidth
                            placeholder='Re-Password'
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            {...register('rePassword')}
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
                    <span>Sign Up</span>
                </LoadingButton>
            </form>
            <VerifyDialog
                open={openDialog}
                data={userMailData}
                onClosed={() => setOpenDialog(false)}
                onSuccess={() => {
                    setOpenDialog(false)
                    onToggle()
                }}
            />
        </Fragment>
    );
}
export default RegisterAccount