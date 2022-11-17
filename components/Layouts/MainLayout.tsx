import Header from '../Commons/Header/Header';
import Footer from '../Commons/Footer';

type Props = {
    maxWidth?: 'max-w-6xl' | 'max-w-7xl' | 'max-w-screen-xl';
    children: React.ReactNode;
};

const defaultMaxWidth = 'max-w-screen-xl';

const MainLayout: React.FC<Props> = ({
    children,
    maxWidth = defaultMaxWidth,
}) => {
    return (
        <>
            <Header maxWidth={maxWidth} />
            <div className={`${maxWidth} mx-auto px-4 py-4`}>{children}</div>
            <Footer maxWidth={maxWidth} />
        </>
    );
};

export default MainLayout;
