export default function PageTitle({ children, ...rest }) {
    return (
        <h1
            className="text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl"
            {...rest}
        >
            {children}
        </h1>
    );
}
