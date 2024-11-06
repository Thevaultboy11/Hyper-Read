import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown

    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-4">
          <h1 className="text-6xl text-primary200">500</h1>

          <h1 className="h2">Oops, there is an error!</h1>
          <div className="flex gap-x-8">
            <button
              onClick={async () => {
                this.setState({ hasError: false });
                this.props.clientRouter.reload();
              }}
              className="min-w-max py-2 px-4 rounded-md text-white  bg-primary200"
            >
              Try again
            </button>
            <button
              onClick={async () => {
                this.setState({ hasError: false });
                this.props.clientRouter.push("/home");
              }}
              className="min-w-max py-2 px-4 rounded-md text-black  bg-secondary200"
            >
              Go to home
            </button>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
