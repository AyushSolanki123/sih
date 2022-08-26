const env = {
  baseUrl: "https://aquadetec-backend.herokuapp.com/api/v1",
  // Authentication
  login: "/auth/login",
  register: "/auth/register",
  refreshToken: "/auth/refreshToken",
  status: "/auth/login/status",
  //Users
  getUser: "/user",
  updateUser: "/user",
  // History
  createHistory: "/history/create",
  listHistory: "/history/{userId}",
  editHistory: "/history/{historyId}",
  deleteHistory: "/history/{historyId}",
  //feedback
  listFeedback: "/fish/feedback/list",
  createFeedback: "/fish/feedback/create",
};

export default env;
