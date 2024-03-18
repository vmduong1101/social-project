import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { secondState } from '..';

const CountdownTimer = () => {
    const [millisecond, setMillisecond] = useRecoilState(secondState);

    const seconds = Math.ceil(millisecond / 1000);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (millisecond > 0) {
                setMillisecond(prevRemainingTime => prevRemainingTime - 1000);
            } else {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [setMillisecond, millisecond]);

    return (
        <div className='text-center w-16'>
            <p className='text-red-600 m-0 font-medium'>{seconds !== 0 ? seconds : 'Expired!'}</p>
        </div>
    );
};

export default CountdownTimer;
