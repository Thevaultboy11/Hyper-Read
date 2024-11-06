import node_instance from "../index";
export const get_graphWpm = async () => {
    try {
        const res = await node_instance.get("/analytics/wpm/", {
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
