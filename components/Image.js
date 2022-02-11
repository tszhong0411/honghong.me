import NextImage from "next/image";

// eslint-disable-next-line jsx-a11y/alt-text
export default function Image({ ...rest }) {
    return (
        <div>
            <NextImage {...rest} />
        </div>
    );
}
