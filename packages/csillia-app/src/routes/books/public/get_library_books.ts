import node_instance from "../../index";
export const get_all_book_library = async (id: number) => {
  try {
    const res = await node_instance.get(`/library/list/`, {
      withCredentials: true,
      headers: {
        Accept: "text",
      },
    });
    return res;
  } catch (err: any) {
    /*  showError("Error in getting the books"); */
    return err;
  }
};
