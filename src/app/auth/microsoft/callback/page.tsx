"use client"
import { gql, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';

export const SIGN_IN_WITH_MS = gql`
  query signInWithMs($code: String!) {
    signInWithMs(arg: {code: $code}) {
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

const WaitingAuthMsChecking = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') || ''

    const { loading, error, data } = useQuery(SIGN_IN_WITH_MS, {
        variables: { code },
        onCompleted(data) {
            if (typeof window !== "undefined") {
                window.opener.postMessage(data, window.origin);
                window.close()
            }
        },
        onError() {
            window.close()
        }
    });

    return (
        <div className='container-loader'>
            <div className="custom-loader"></div>
        </div>
    )
}

export default WaitingAuthMsChecking