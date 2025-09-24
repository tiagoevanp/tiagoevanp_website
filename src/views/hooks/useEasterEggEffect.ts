import { useEffect, useState } from 'react';

import Audio from '../../assets/audio/bleeh.mp3';

export const useEasterEggEffect = () => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const rootElement = document.getElementById('root');
        const audioElement = document.createElement('audio');
        audioElement.setAttribute('id', 'bleh');
        audioElement.setAttribute('src', Audio);
        audioElement.setAttribute('preload', 'auto');
        audioElement.style = 'visibility: hidden';

        rootElement?.appendChild(audioElement);

        return () => {
            rootElement?.removeChild(audioElement);
        };

    }, []);

    useEffect(() => {
        const audioElement = document.getElementById('bleh') as HTMLAudioElement | null;
        const callback = () => {
            setPlay(false);
        };

        audioElement?.addEventListener('ended', callback);

        if (play) {
            audioElement?.play();
        }

        return () => {
            audioElement?.removeEventListener('ended', callback);
        };
    }, [play]);

    const runEffect = () => setPlay(true);

    return { runEffect };
};
