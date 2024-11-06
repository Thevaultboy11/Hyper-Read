import axios from "axios";
import node_instance from "../../index";
export const post_admin_book = async (file: any) => {
  try {
    const res = await node_instance.post("/upload/books/?public=1", file, {
      headers: {
        "Content-Type": "multipart/form-data; boundary=<boundary-string>",
      },
    });
    return res;
  } catch (err: any) {}
};
