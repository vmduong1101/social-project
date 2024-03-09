import { REGISTER } from '@/src/app/login/graphql/mutation/mutation-register';
import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import VerifyDialog from './dialog';

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

const RegisterAccount = (props: Props) => {
    const { onToggle } = props
    const { enqueueSnackbar } = useSnackbar();
    const [registerUser, { loading }] = useMutation(REGISTER);
    const { register, handleSubmit, reset } = useForm<FormInput>()

    const [openDialog, setOpenDialog] = useState(false);
    const [userMailData, setUserMailData] = useState({});

    const onRegisterUser: SubmitHandler<FormInput> = (data) => registerUser({
        variables: {
            password: data.password,
            re_password: data.rePassword,
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email
        },
        onCompleted(data) {
            const message = data?.register?.message || ''
            const variant = data?.register?.code === 200 ? 'success' : 'warning'

            if (data?.register?.code === 200) {
                setOpenDialog(true)
                reset()
                setUserMailData(data?.register?.data)
            }
            enqueueSnackbar(message, { variant })
        },
    })

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
                onSuccess={() => {
                    setOpenDialog(false)
                    onToggle()
                }}
            />
        </Fragment>
    );
}
export default RegisterAccount