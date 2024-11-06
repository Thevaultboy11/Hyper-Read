import node_instance from "../../index";
export const delete_library_book = async (id: number) => {
  try {
    const res = await node_instance.delete(`/library/remove-book/${id}`, {
      withCredentials: true,
      headers: {
        Accept: "text",
      },
    });
    return res;
  } catch (err: any) {
    return err;
  }
};
