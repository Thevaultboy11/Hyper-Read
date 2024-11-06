import { useRouter } from "next/router";

function Error({ statusCode }: any) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-3xl"> 500 / Oops something went wrong!</h1>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
