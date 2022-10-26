import Link from 'next/link';
import { NextPage } from 'next';

export type SSRProps = {
    posts: Array<any>;
};

const SSRPage: NextPage<SSRProps> = ({ posts }) => {
    return (
        <>
            <Link href={'https://tinhte.vn'}>
                <div>Tinhte.vn</div>
            </Link>
            <Link href={'/'}>
                <div>Index</div>
            </Link>

            <ol>
                {posts?.map((post) => {
                    return (
                        <li className={'tw-mb-4'} key={post.id}>
                            Title: {post?.title}
                        </li>
                    );
                })}
            </ol>
        </>
    );
};

export const getServerSideProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    return {
        props: {
            posts,
        },
    };
};
export default SSRPage;
