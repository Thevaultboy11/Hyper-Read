import node_instance from "../index";
export const post_visitcount = async (date: string) => {
    try {
        const res = await node_instance.post(
            "/analytics/insert-login-count/",
            {
                loginDate: date,
            },
            {
                withCredentials: true,
                headers: {
                    Accept: "text",
                },
            },
        );
        return res;
    } catch (err: any) {
        return err;
    }
};
