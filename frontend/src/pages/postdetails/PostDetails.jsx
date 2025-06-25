import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const PostDetails = () => {
    const { postId } = useParams();
    
    const { data: post, isLoading, error } = useQuery({
        queryKey: ["post", postId],
        queryFn: async () => {
            const res = await fetch(`/api/posts/${postId}`);
            if (!res.ok) throw new Error("Post not found");
            return res.json();
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-red-500">{error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{post.user.fullName}</h1>
            <p className="text-gray-500">@{post.user.username}</p>
            <p className="mt-2">{post.text}</p>
            {post.img && <img src={post.img} alt="Post" className="mt-4 rounded-lg" />}
        </div>
    );
};

export default PostDetails;
