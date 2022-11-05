import Header from '../Commons/Header/Header';

type Props = {
    maxWidth?: string;
    children: React.ReactNode;
};

const defaultMaxWidth = 'tw-max-w-screen-xl';

const MainLayout: React.FC<Props> = ({
    children,
    maxWidth = defaultMaxWidth,
}) => {
    return (
        <>
            <Header maxWidth={maxWidth} />
            <div className={`${maxWidth} tw-mx-auto tw-px-4 tw-py-4`}>
                {children}
            </div>
        </>
    );
};

export default MainLayout;
