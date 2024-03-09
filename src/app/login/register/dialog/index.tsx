import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Divider, Grid, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { isEqual } from 'lodash';
import { enqueueSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { VERIFY } from '../../graphql/mutation/mutation-verify';

type FormInput = {
    code: string
}
type Props = {
    open: boolean
    onSuccess?: (data: any) => void
    data?: any
}

const VerifyDialog = (props: Props) => {
    const { open = false, data, onSuccess } = props
    const [openDialog, setOpenDialog] = useState(false);
    const [verify, { loading }] = useMutation(VERIFY);
    const { register, handleSubmit, reset } = useForm<FormInput>()

    const onVerify: SubmitHandler<any> = (value) => {
        const check = isEqual(data?.code, value?.code)
        if (!check) return enqueueSnackbar('Code is not valid', { variant: 'warning' })
        const newData = { ...data }
        return verify({
            variables: newData,
            onCompleted(data) {
                const { code, message } = data?.verify
                const variant = code === 200 ? 'success' : 'warning'
                if (code === 200) {
                    reset()
                    onSuccess && onSuccess(data?.verify)
                }
                enqueueSnackbar(message, { variant })
            },
        })
    }

    useEffect(() => {
        setOpenDialog(!!open)
    }, [open])

    return (
        <Fragment>
            <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Divider />
                <DialogContent>
                    <form onSubmit={handleSubmit(onVerify)}>
                        <Grid
                            container
                            columnGap={1}
                            alignItems={'end'}
                        >
                            <Grid item lg={9}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Code'
                                    variant='standard'
                                    placeholder='Code'
                                    inputProps={{
                                        autoComplete: 'new-password',
                                        form: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    {...register('code')}
                                />
                            </Grid>
                            <Grid item lg={2}>
                                <LoadingButton
                                    size="medium"
                                    type='submit'
                                    loading={loading}
                                    variant="contained"
                                    color='success'
                                >
                                    <span>Verify</span>
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
export default VerifyDialog;