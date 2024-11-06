import axios from "axios";
import node_instance from "../index";
export const post_personal_book = async (file: any, showSucsses: any) => {
  const formData = new FormData();
  formData.append("author", "Anonymous");
  formData.append("books", file);

  try {
    const res = await node_instance.post("/upload/books/?public=0", formData, {
      headers: {
        "Content-Type": "multipart/form-data; boundary=<boundary-string>",
      },
    });
    showSucsses(res.data.msg);
    return res;
  } catch (err: any) {}
};
