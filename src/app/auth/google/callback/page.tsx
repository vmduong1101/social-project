"use client"
import React, { useCallback, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import { useSearchParams } from 'next/navigation'
import { isEqual } from 'lodash';

export const SIGN_IN_WITH_GOOGLE = gql`
  query signInWithGoogle($code: String!) {
    signInWithGoogle(arg: {code: $code}) {
        code
        message
        access_token
        data {
            full_name
            email
            role
        }
    }
  }
`;

const WaitingAuthChecking = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') || ''
    const { loading, error, data } = useQuery(SIGN_IN_WITH_GOOGLE, {
        variables: { code }
    });

    // useEffect(() => {
    //     console.log('code', code)
    //     if (typeof window !== "undefined") {
    //         signInWithGoogle({
    //             variables: { code },
    //             onCompleted(data) {
    //                 // const token = data?.signInWithGoogle?.access_token || ''
    //                 // const user = data?.signInWithGoogle?.data || {}
    //                 // localStorage.setItem('token', token)
    //                 // localStorage.setItem('social-user', JSON.stringify(user))
    //                 // window.location.href = '/'
    //                 // window.close()
    //             }
    //         })
    //     }
    // }, [])

    return (
        <div className='flex h-100 w-100 justify-center align-items-center'>Checking...</div>
    )
}

export default WaitingAuthChecking