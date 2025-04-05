import { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';

const useAIText = (defaultText) => {
    const [text, setText] = useState(defaultText);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchText = async () => {
            try {
                const { data } = await customFetch.post('/ai/generate-text');
                setText(data.text);
            } catch (error) {
                setText(defaultText);
            } finally {
                setIsLoading(false);
            }
        };

        fetchText();
    }, [defaultText]);

    return { text, isLoading };
};

export default useAIText;