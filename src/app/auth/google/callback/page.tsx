'use client';
import { gql, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const SIGN_IN_WITH_GOOGLE = gql`
  query signInWithGoogle($code: String!) {
    signInWithGoogle(arg: {code: $code}) {
        code
        message
        access_token
        data {
            id
            full_name
            email
            role
            picture
            account
        }
    }
  }
`;

const WaitingAuthChecking = () => {
    const searchParams = useSearchParams()

    const code = searchParams.get('code') || ''
    const error = searchParams.get('error') || ''

    const { loading, data } = useQuery(SIGN_IN_WITH_GOOGLE, {
        variables: { code },
        onCompleted(data) {
            if (typeof window !== "undefined") {
                window.opener.postMessage(data, window.origin)
                window.close()
            }
        },
        onError() {
            window.close()
        }
    });

    useEffect(() => {
        if (error) {
            window.close()
        }
    }, [error])

    return (
        <>
            <div className='container-loader'>
                <div className="custom-loader"></div>
            </div>
        </>
    )
}

export default WaitingAuthChecking