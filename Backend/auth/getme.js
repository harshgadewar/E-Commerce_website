export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (e) {
    console.error("GET ME ERROR:", e);

    return res.status(500).json({
      message: "Failed to get user",
      error: e.message,
    });
  }
};
