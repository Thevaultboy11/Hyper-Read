import node_instance from "../index";
export const post_wpm = async (wpm: number) => {
  try {
    const res = await node_instance.post(
      "/analytics/update-wpm/",
      {
        wpm: wpm,
        wpmDate: new Date(),
      },
      {
        withCredentials: true,
        headers: {
          Accept: "text",
        },
      }
    );
    return res;
  } catch (err: any) {
    return err;
  }
};
