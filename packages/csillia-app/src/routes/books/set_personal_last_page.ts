import node_instance from "../index";
export const set_personal_last_page = async (bookId: number, page: number) => {
  try {
    const res = await node_instance.post(
      `/books/page/${bookId}/${page}`,
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
