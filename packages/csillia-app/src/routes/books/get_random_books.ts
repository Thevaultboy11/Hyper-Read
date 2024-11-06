import node_instance from "../index";
export const get_random_books = async () => {
  try {
    const res = await node_instance.get(`books/random-pages/`, {
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
