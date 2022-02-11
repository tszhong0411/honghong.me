export default function PageTitle({ children }) {
    return (
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
            {children}
        </h1>
    );
}
