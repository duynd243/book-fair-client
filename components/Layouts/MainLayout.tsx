import Header from '../Commons/Header/Header';

type Props = {
    children: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <div
                className={
                    'tw-mx-auto tw-h-[2000px] tw-max-w-screen-xl tw-px-4 tw-py-4'
                }
            >
                {children}
            </div>
        </>
    );
};

export default MainLayout;
