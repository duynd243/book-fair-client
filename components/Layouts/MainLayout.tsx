import Header from '../Commons/Header/Header';
import Footer from '../Commons/Footer';

type Props = {
    maxWidth?: 'tw-max-w-6xl' | 'tw-max-w-7xl' | 'tw-max-w-screen-xl';
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
            <Footer maxWidth={maxWidth} />
        </>
    );
};

export default MainLayout;
