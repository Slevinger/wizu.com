export const getUserDetailsApi = id => ({
  method: "get",
  url: `/users/${id}`,
  headers: {
    "Content-Type": "application/json"
  }
});
