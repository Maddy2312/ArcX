import { login, register, getMe } from "../services/auth.api.js";
import { setLoading, setUser } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const handleRegister = async (formData) => {
    try {
      const data = await register(formData);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (formData) => {
    try {
      const data = await login(formData);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
      dispatch(setLoading(false));
    } catch (error) {
      throw error;
    } finally{
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
  };
};
export default useAuth;
