import NextImage from 'next/image';

import styles from './Image.module.sass';

type ImageProps = {
    src: string;
    placeholder: string;
    alt: string;
    containerStyle: string;
    imageStyle: string;
    onClick?: () => void;
};

export const Image = ({
    src,
    placeholder,
    alt,
    containerStyle,
    imageStyle,
    onClick,
}: ImageProps) => {
    return (
        <div className={`${styles.container} ${containerStyle}`}>
            <NextImage
                className={`${styles.image} ${imageStyle}`}
                width={512}
                height={512}
                src={src}
                alt={alt}
                onClick={onClick}
                placeholder='blur'
                blurDataURL={placeholder}
            />
        </div>
    );
};
