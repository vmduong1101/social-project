import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { isEqual } from 'lodash';
import { enqueueSnackbar } from 'notistack';
import { Fragment, useEffect, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { codeVerifyState, secondState } from '..';
import { REGISTER } from '../../graphql/mutation/mutation-register';
import { VERIFY } from '../../graphql/mutation/mutation-verify';
import CountdownTimer from '../countdown';
import './styles.css';
import Spin from '@/src/common/components/loading/spin';

type Props = {
    open: boolean
    onSuccess?: (data: any) => void
    onClosed?: () => void
    data?: any
}

const VerifyDialog = (props: Props) => {
    const { open = false, data, onSuccess, onClosed } = props
    const [verify, { loading }] = useMutation(VERIFY);
    const [registerUser, { loading: resendLoading }] = useMutation(REGISTER);
    const [_millisecond, setMillisecond] = useRecoilState<any>(secondState);
    const [codeVerify, setCodeVerify] = useRecoilState(codeVerifyState);

    const inputRefs: any = useRef([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [otp, setOTP] = useState(['', '', '', '', '', ''])

    const onResend = () => {
        const params = {
            password: data?.password,
            re_password: data?.re_password,
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            code: data?.code
        }
        registerUser({
            variables: params,
            onCompleted(res) {
                const message = res?.register?.message || ''
                const variant = res?.register?.code === 200 ? 'success' : 'warning'
                enqueueSnackbar(message, { variant })
                setMillisecond(res?.register?.data?.expires_at)
                setCodeVerify(res?.register?.data?.code)
            },
        })
    }

    const onVerify: SubmitHandler<any> = () => {
        const otpCode = otp.join('');
        const check = isEqual(codeVerify, otpCode)
        if (!check) return enqueueSnackbar('Code is not valid', { variant: 'warning' })
        const newData = { ...data, code: codeVerify }
        return verify({
            variables: newData,
            onCompleted(data) {
                const { code, message } = data?.verify
                const variant = code === 200 ? 'success' : 'warning'
                if (code === 200) {
                    onSuccess && onSuccess(data?.verify)
                    setOTP(['', '', '', '', '', ''])
                }
                enqueueSnackbar(message, { variant })
            },
        })
    }

    const handleInputChange = (index: number, value: string) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handlePaste = (event: any) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('Text').slice(0, 6);
        const newOTP = pastedData.split('');
        setOTP(newOTP);
        inputRefs.current[Math.min(newOTP.length, inputRefs.current.length - 1)].focus();
    };

    const handleKeyDown = (event: any, index: number) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleClose = () => {
        setOpenDialog(false)
        setOTP(['', '', '', '', '', ''])
        setMillisecond(0)
        onClosed && onClosed()
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
                onClose={handleClose}
            >
                <Spin spinning={resendLoading}>
                    <form className="otp-Form">
                        <span className="mainHeading">Enter OTP</span>
                        <p className="otpSubheading">We have sent a verification code to your email</p>
                        <div className="inputContainer">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="otp-input"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(input) => (inputRefs.current[index] = input)}
                                    onPaste={handlePaste}
                                />
                            ))}
                        </div>
                        <LoadingButton
                            size="medium"
                            loading={loading}
                            variant="contained"
                            color='success'
                            className="verifyButton"
                            onClick={onVerify}
                        >
                            <span>Verify</span>
                        </LoadingButton>
                        <CountdownTimer />
                        <IconButton
                            className="exitBtn"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize='small' />
                        </IconButton>
                        <p className="resendNote">
                            Do not receive the code?
                            <div className="resendBtn"
                                onClick={() => onResend()}
                            >
                                Resend Code
                            </div>
                        </p>
                    </form>
                </Spin>
            </Dialog>
        </Fragment>
    );
}
export default VerifyDialog;