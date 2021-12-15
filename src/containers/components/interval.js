import React, {useEffect, useState} from "react";

export const IntervalExample = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {seconds} sec passati dal mount.
            </header>
        </div>
    );
};