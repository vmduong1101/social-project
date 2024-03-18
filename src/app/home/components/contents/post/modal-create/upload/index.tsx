import { CloseOutlined } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { isArray } from 'lodash'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { LuImagePlus } from 'react-icons/lu'

type Props = {
    onChange?: (values: TUploadContent) => void
}

export type TUploadContent = {
    files: FileList | null
    images: string[] | string
}

const UploadContent = (props: Props) => {
    const { onChange } = props
    const inputRef: any = useRef<HTMLInputElement>(null)

    const [uploadValues, setUploadValues] = useState<TUploadContent>()


    const handleClick = () => {
        inputRef?.current?.click();
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList
        const images = Array.from(files).map((file) => URL.createObjectURL(file))
        const values = { files, images }
        setUploadValues(values)
        onChange?.(values)
    }
    console.log('uploadValues', uploadValues)

    const hasImg = !!uploadValues?.images

    return (
        <div className='basic-border p-2'>
            <div className='flex justify-center relative group/item'>
                {isArray(uploadValues?.images) &&
                    <Grid container columnGap={0.5} wrap='nowrap'>
                        {
                            uploadValues?.images.map((blob, index) => {
                                const col = 12 / uploadValues?.images?.length || 1

                                return <Grid item lg={col} key={index}>
                                    <Image
                                        src={blob}
                                        alt=''
                                        unoptimized
                                        className={`object-cover rounded-2xl`}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </Grid>
                            })
                        }
                    </Grid>
                }
                <div className='absolute top-2 right-2 z-10'>
                    <IconButton className='bg-bg-icon-button' size='small'>
                        <CloseOutlined />
                    </IconButton>
                </div>
                {hasImg &&
                    <div className='absolute bg-[#44495026] w-full h-full rounded-2xl invisible group-hover/item:visible'>
                        <div className='flex justify-center items-center gap-2 text-[#050505] bg-white 
                    w-44 h-9 rounded-lg mt-2 ml-2 cursor-pointer hover:bg-[#F5F6F7]'
                            onClick={handleClick}
                        >
                            <IconButton className='bg-bg-icon-button' size='small'>
                                <LuImagePlus />
                            </IconButton>
                            <div className="font-medium text-[14px]">Add Photos/Videos</div>
                        </div>
                    </div>
                }
            </div>
            {!hasImg &&
                <div
                    className="flex justify-center items-center flex-col gap-2 px-4 py-6 bg-[#323436]
                        rounded-lg hover:bg-[#47494a] cursor-pointer mt-2"
                    onClick={handleClick}
                >
                    <IconButton className='bg-bg-icon-button'>
                        <LuImagePlus />
                    </IconButton>
                    <div className="font-medium text-[18px]">Add Photos/Videos</div>
                    <small>or drag and drop</small>
                </div>
            }
            <input type="file" className='hidden' multiple ref={inputRef} onChange={handleOnChange} />
        </div>
    )
}

export default UploadContent