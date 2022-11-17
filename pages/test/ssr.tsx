async function getServer() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
}

export default async function SSRPage() {
    const posts = await getServer();

    console.log(Array.isArray(posts), posts);

    return (
        <div>
            <ol>
                <li>abc</li>
                {/* {posts?.map((post: any) => {
                    return (
                        <li className={'mb-4'} key={post?.id}>
                            Title: {post?.title}
                        </li>
                    );
                })} */}
            </ol>
        </div>
    );
}
