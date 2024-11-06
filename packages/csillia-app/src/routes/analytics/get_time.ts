import node_instance from "../index";
export const get_time = async () => {
    try {
        const res = await node_instance.get("/analytics/time-count/", {
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
