import { NextPage } from 'next';
import Header from '../components/Commons/Header/Header';

const IndexPage: NextPage = () => {
    return (
        <>
            <Header />
            <div
                className={
                    'tw-h-[2000px] tw-mx-auto tw-max-w-screen-xl tw-px-5'
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
