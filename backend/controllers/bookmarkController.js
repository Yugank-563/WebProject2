import Bookmark from "../models/Bookmark.js";

// Toggle bookmark (add if not exists, remove if exists)
export const toggleBookmark = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const existing = await Bookmark.findOne({ userId, postId });
    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.json({ bookmarked: false });
    } else {
      await Bookmark.create({ userId, postId });
      return res.json({ bookmarked: true });
    }
  } catch (err) {
    console.error("Bookmark toggle error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Check if bookmarked
export const checkBookmark = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const exists = await Bookmark.findOne({ userId, postId });
    res.json({ bookmarked: !!exists });
  } catch (err) {
    console.error("Bookmark check error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all bookmarks for a user
export const getAllBookmarks = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookmarks = await Bookmark.find({ userId }).populate("postId");
    if (!bookmarks) {
      return res.json([])
    }
    res.json(bookmarks);
  } catch (err) {
    console.error("Get bookmarks error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
