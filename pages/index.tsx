import Header from 'components/Commons/Header/Header';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
    return (
        <>
            <Header />
            <div
                className={
                    'tw-mx-auto tw-h-[2000px] tw-max-w-screen-xl tw-px-4 tw-pt-32 lg:tw-pt-24'
                }
            >
                <div>banner</div>
                <div>campaigns</div>
                <div>test deploy changes</div>
            </div>
        </>
    );
};

export default IndexPage;
