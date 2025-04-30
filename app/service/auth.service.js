import Cookies from "js-cookie";

const { httpAxios } = require("../config/httpAxios");

// async function login(email, password) {
//   try {
//     const response = await httpAxios.post("/auth/login", {
//       email,
//       password,
//     });
//     console.log("usert okne",response);
//     // Cookies.set("access_token", response.data.data.accessToken, { expires: 7 }); // 7 day expiry
//     return response.data;

//   } catch (error) {
//     console.log(error.response.data);
//   }
// }

// export { login };
export const login = async (email, password) => {
  const response = await httpAxios.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
