import node_instance from "../index";
export const get_pages = async (id: number, start: number, end: number) => {
  try {
    console.warn("geting the book pages", id, start, end);
    const res = await node_instance.get(
      `/books/content/${id}?start=${start}&end=${end}`,
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
