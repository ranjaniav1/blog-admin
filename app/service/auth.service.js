import { httpAxios } from "../config/httpAxios";

async function login(email, password) {
  try {
    const response = await httpAxios.post(
      "/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

async function getAllUsers(page) {
  try {
    const response = await httpAxios.get(`/auth/users?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

async function manageUserRole(userId, role) {
  try {
    const response = await httpAxios.put(`/auth/manage-user/${userId}`, {
      role,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export { login, getAllUsers, manageUserRole };
