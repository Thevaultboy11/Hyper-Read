import { getServerSession } from "next-auth";
import { Options } from "../../pages/api/auth/[...nextauth]";

const handle_protected_routes = async (req: any, res: any) => {
  const session = await getServerSession(req, res, Options);
  if (session && req.url === "/home") {
    // User is already on the home page, no need to redirect
    return {
      props: {},
    };
  }

  if (!session) {
    // User is not logged in, redirect to home page
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default handle_protected_routes;
