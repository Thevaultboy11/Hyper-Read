import node_instance from "../index";
export const get_is_admin = async () => {
  try {
    const res = await node_instance.get("/auth/isAdmin", {
      maxRedirects: 10,
      headers: {
        Accept: "text",
      },
    });
    return res;
  } catch (err: any) {}
};
