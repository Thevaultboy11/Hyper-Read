const handle_admin_routes = async (req: any, res: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_PATH}/auth/isAdmin`,
      {
        headers: {
          cookie: req.headers.cookie,
        },
      }
    );

    if (response.status === 200) {
      // Handle successful response from the server-side route
      // You can perform additional logic here if needed
      return {
        props: {},
      };
    } else {
      // Redirect the user to the home directory if status code is not 200
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }
  } catch (error) {
    // Handle error if the request to the server-side route fails
    console.error(error);

    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
};
export default handle_admin_routes;
