import node_instance from "../index";
export const get_all_library_books = async () => {
  try {
    const res = await node_instance.get("/library/list/", {
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
