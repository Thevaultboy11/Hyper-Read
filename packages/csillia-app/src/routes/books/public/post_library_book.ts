import node_instance from "../../index";
export const post_book_library = async (id: number) => {
  try {
    const res = await node_instance.post(
      `/library/add-book/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          Accept: "text",
        },
      }
    );
    return res;
  } catch (err: any) {
    /*  showError("Error in getting the books"); */
    return err;
  }
};
