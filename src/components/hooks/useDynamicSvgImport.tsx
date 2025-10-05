import { type ReactElement, useEffect, useState } from 'react';

export type NameProp = 'moon' | 'sun' | 'bars' | 'github' | 'linkedin' | 'magnifying-glass';

type OptionsProp = {
    onCompleted?: (name: string, component: ReactElement<SVGElement>) => void;
    onError?: (err: unknown) => void;
};

const useDynamicSVGImport = (name: NameProp, options: OptionsProp = {}) => {
    const { onCompleted, onError } = options;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const [SvgIcon, setSvgIcon] = useState<ReactElement<SVGElement> | null>(null);

    useEffect(() => {
        setLoading(true);
        setSvgIcon(null);
        setError(null);

        const importIcon = async () => {
            try {
                const { default: ReactComponent } = await import(`../../assets/icons/${name}.svg?react`);

                setSvgIcon(ReactComponent());
                onCompleted?.(name, ReactComponent());
            } catch (err) {
                setError(err);
                onError?.(err);
            } finally {
                setLoading(false);
            }
        };

        importIcon();
    }, [name, onCompleted, onError]);

    return { error, loading, SvgIcon };
};

export default useDynamicSVGImport;
