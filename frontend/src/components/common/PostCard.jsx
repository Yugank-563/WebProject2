// PostCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import Post from "./Post";
import RightPanel from "./RightPanel";

const PostCard = ({ postId, userId }) => {
	const [isBookmarked, setIsBookmarked] = useState(false);

	useEffect(() => {
		const checkBookmarkStatus = async () => {
			try {
				if(!postId || !userId) return;
				const res = await axios.get(`/api/bookmarks/check/${userId}/${postId}`);
				setIsBookmarked(res.data.bookmarked);
			} catch (error) {
				console.error("Bookmark check failed", error);
			}
		};
		checkBookmarkStatus();
	}, [userId, postId]);

	const toggleBookmark = async () => {
		try {
			if(!userId || !postId){
				toast.error("Missing user or post ID");
				return;
			}

			console.log("userId:", userId);
			console.log("postId:", postId);

			const res = await axios.post("/api/bookmarks/toggle", {
				userId,
				postId,
			});
			console.log(res);
			
			setIsBookmarked(res.data.bookmarked);
			toast.success(res.data.bookmarked ? "Post saved" : "Post removed");
		} catch (error) {
			console.error("Bookmark error:", error);
			toast.error("Bookmark action failed");
		}
	};

	return (
		<>
			<button onClick={toggleBookmark}>
				{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
			</button>
			{/* <Post key={post._id} post={post} /> */}
		</>
	);
};

export default PostCard;
