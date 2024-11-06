import { useSnackbarContext } from "../../context/snackbarContext";
import node_instance from "../index";

export const sign_up = async (user: any, showSucsses: any, showError: any) => {
  try {
    const res = await node_instance.post("/register/", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      wpm: 200,
    });
    showSucsses(res.data.msg);
    return res;
  } catch (err: any) {
    showError(err.response.data.msg);
  }
};
