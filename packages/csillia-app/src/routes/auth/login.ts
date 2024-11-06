import node_instance from "../index";
export const log_in = async (user: any, showSucsses: any, showError: any) => {
  try {
    const res = await node_instance.post(
      "/auth/login",
      {
        email: user.email,
        password: user.password,
      },
      {
        maxRedirects: 10,
        headers: {
          Accept: "text",
        },
      }
    );
    showSucsses(res.data.msg);
    return res;
  } catch (err: any) {
    showError(err.response.data.msg);
  }
};
