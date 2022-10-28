import Header from 'components/Commons/Header/Header';
import { NextPage } from 'next';
import Banner from '../components/Home/Banner';

const IndexPage: NextPage = () => {
    return (
        <>
            <Header />
            <div
                className={
                    'tw-mx-auto tw-h-[2000px] tw-max-w-screen-xl tw-px-4 tw-py-4'
                }
            >
                <Banner />
                <div>campaigns</div>
                <div>test deploy changes</div>
            </div>
        </>
    );
};

export default IndexPage;
