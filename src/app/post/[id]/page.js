
import PostPage from '../../../../components/post'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// generateMetadata is used to generate the metadata for the page
export async function generateMetadata({params}) {
    const post = await fetch(`${BASE_URL}/api/post/${params.id}`);
    const data = await post.json();
    console.log('data', data);
    return {
        title: data.post.title,
        description: data.post.description
    }
}

export default function Page({params}) {
    return (
        <div>
            <PostPage id={params.id} />
        </div>
    )
}