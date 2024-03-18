import { CloseOutlined, ImageOutlined } from '@mui/icons-material';
import { Button, DialogContent, Divider, Grid, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaUserFriends } from 'react-icons/fa';
import UploadContent, { TUploadContent } from './upload';
import Image from 'next/image';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

const ModalCreatePost = (props: SimpleDialogProps) => {
    const { onClose, open } = props;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [valueTextArea, setValueTextArea] = useState('');
    const [uploadValues, setUploadValues] = useState<TUploadContent>()

    const handleUploadContent = (values: TUploadContent) => {
        setUploadValues(values)
    }
    console.log('uploadValues', uploadValues)
    const handleClose = () => {
        onClose();
        setValueTextArea('')
    }

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    }, [valueTextArea])

    useEffect(() => {
        let idTime: NodeJS.Timeout
        if (open) {
            idTime = setTimeout(() => {
                if (textAreaRef.current) {
                    textAreaRef.current.focus();
                    textAreaRef.current.style.height = 'auto';
                    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
                }
            }, 1)
        }
        return () => clearTimeout(idTime)
    }, [open])

    return (
        <Dialog
            open={open}
            closeAfterTransition
        >
            <DialogTitle className='relative'>
                <div className='flex justify-center'>
                    Create Post
                </div>
                <div className='absolute top-2 right-2'>
                    <IconButton onClick={handleClose} className='bg-bg-icon-button'>
                        <CloseOutlined />
                    </IconButton>
                </div>
            </DialogTitle>
            <Divider className="w-full bg-gray-divider mt-2" />
            <DialogContent className='w-[500px]'>
                <Grid container rowSpacing={2}>
                    <Grid item lg={12} className='flex justify-start items-center gap-2 pb-4'>
                        <Avatar style={{ width: 44, height: 44 }} src=''>M</Avatar>
                        <div>
                            <div className='mb-1'>Minh Duong</div>
                            <div className='bg-bg-icon-button flex items-center p-1 rounded-md gap-1'>
                                <FaUserFriends />
                                <span className='text-[13px] font-medium'>Friends</span>
                                <FaCaretDown />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} className='w-full'>
                        <Grid container rowSpacing={2} className='scrollbar-cs max-h-64 overflow-auto'>
                            <Grid item lg={12}>
                                <textarea
                                    className='bg-bg-card border-0 text-[24px] h-auto text-text-dark 
                                    outline-none overflow-hidden resize-none min-h-10 w-full box-border'
                                    placeholder='What on your mind?'
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                    value={valueTextArea}
                                    onChange={(e) => setValueTextArea(e.target.value)}
                                    ref={textAreaRef}
                                    rows={2}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <UploadContent onChange={handleUploadContent} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={12} className='w-full'>
                        <div className='flex justify-between items-center basic-border p-2'>
                            <div>
                                Add to your post
                            </div>
                            <div>
                                <IconButton>
                                    <ImageOutlined />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12} className='w-full'>
                        <Button
                            variant='contained'
                            className='w-full bg-bg-secondary hover:opacity-90 hover:bg-bg-secondary'
                        >
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog >
    );
}
export default ModalCreatePost
