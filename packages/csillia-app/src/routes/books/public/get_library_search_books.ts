import node_instance from "../../index";
export const get_library_books = async (book_name: string) => {
  try {
    const res = await node_instance.get(`/library/search?q=${book_name}`, {
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
