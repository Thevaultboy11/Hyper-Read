import node_instance from "../index";
export const get_pr = async () => {
    try {
        const res = await node_instance.get("/analytics/wpm-pr/", {
            withCredentials: true,
            headers: {
                Accept: "text",
            },
        });
        return res;
    } catch (err: any) {
        return err;
    }
};
