import node_instance from "../index";
export const log_out = async (showSucsses: any, showError: any) => {
  try {
    const res = await node_instance.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    showSucsses(res.data.msg);
    return res;
  } catch (err: any) {
    showError(err.response.data.msg);
  }
};
