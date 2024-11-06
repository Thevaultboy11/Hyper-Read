import node_instance from "../index";
export const get_visits = async () => {
    try {
        const res = await node_instance.get("/analytics/login-count/", {
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
