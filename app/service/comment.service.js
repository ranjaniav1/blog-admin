import { httpAxios } from "../config/httpAxios";

async function getAllComments() {
  try {
    const response = await httpAxios.get("/comments");
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

async function deleteComment(commentId) {
  try {
    const response = await httpAxios.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

export { getAllComments, deleteComment };
