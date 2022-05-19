const { default: axios } = require("axios");

export const handleFollowing = async (userId, sessionUserId) => {
    const { data } = await axios.post(`/api/users/${userId}/follow`, {
        sessionUserId,
      });

      return data
}