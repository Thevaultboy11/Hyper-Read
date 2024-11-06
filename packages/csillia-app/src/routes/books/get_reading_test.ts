import node_instance from "../index";
export const get_reading_test = async () => {
  try {
    const res = await node_instance.get(`books/reading-test`, {
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
