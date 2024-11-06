import node_instance from "../index";
export const post_timespent = async (timespent: number, timedate: string) => {
    try {
        const res = await node_instance.post(
            "/analytics/insert-screentime/",
            {
                timeSpent: timespent,
                timeDate: timedate,
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
