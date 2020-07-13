import { xChange } from "../api/apiCalls";

class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("token");
    if (!!token) this.setJWT(token);
    return !!token ? true : false;
  };

  setJWT = (token) =>
    (xChange.defaults.headers.common["Authorization"] = `Bearer ${token}`);

  login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    this.setJWT(token);
  };
  logout = () => localStorage.clear();
}
export const auth = new AuthService();
