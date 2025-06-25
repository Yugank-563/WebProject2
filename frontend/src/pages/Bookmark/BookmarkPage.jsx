// import { useEffect, useState } from "react";
// import axios from "axios";
// import PostCard from "../../components/common/PostCard";

// const BookmarkPage = ({ currentUser }) => {
//   const [bookmarks, setBookmarks] = useState([]);

//   useEffect(() => {
//     const fetchBookmarks = async () => {
//       const res = await axios.get(`/api/bookmark/${currentUser._id}`);
//       setBookmarks(res.data);
//     };
//     fetchBookmarks();
//   }, [currentUser._id]);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Bookmarked Posts</h2>
//       {bookmarks.length === 0 ? (
//         <p>No bookmarks yet.</p>
//       ) : (
//         bookmarks.map((post) => <PostCard key={post._id} post={post} />)
//       )}
//     </div>
//   );
// };

// export default BookmarkPage;


// BookmarkPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../../components/common/PostCard";
import Post from "../../components/common/Post";

const BookmarkPage = ({ currentUser }) => {
	const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

	useEffect(() => {
		console.log('I AM HERE!!');
		
		const fetchBookmarks = async () => {
			try {
				const res = await axios.get(`/api/bookmarks/${currentUser._id}`);
				console.log(res.data);
				console.log(res.data[0].postId._id);
				
				setBookmarkedPosts(res.data);
			} catch (error) {
				console.error("Failed to fetch bookmarks", error);
			}
		};

		if (currentUser?._id) fetchBookmarks();
	}, [currentUser]);

	return (
		<div className="w-full space-y-4 p-4">
			<h2 className="text-2xl font-bold">Your Bookmarked Posts</h2>
			{bookmarkedPosts.length === 0 ? (
				<p>No bookmarks yet.</p>
			) : (
				bookmarkedPosts.map((post) => (
					
					<PostCard postId={post.postId._id} userId={currentUser._id} />
					// <Post postId={post.postId} />
				))
			)}
		</div>
	);
};

export default BookmarkPage;
