//api
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (err) {
      console.log(err);
      msgText = err.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }
  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));

    history.push("/");
  }

  async function login(user) {
    let msgText = "Login realizado com successo";
    let msgType = "success";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (err) {
      msgText = err.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }

  function logout() {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "success";
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/");

    setFlashMessage(msgText, msgType);
  }

  return { register, authenticated, logout, login };
}
