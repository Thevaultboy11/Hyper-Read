import node_instance from "../index";
export const delete_personal_book = async (id: number) => {
  try {
    const res = await node_instance.delete(`/books/remove/${id}`, {
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
