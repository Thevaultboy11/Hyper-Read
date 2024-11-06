import "../styles/globals.scss";
import { SnackbarProvider } from "notistack";
import { SnackbarProviderMessage } from "../context/snackbarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "../theme/pallete";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../component/reusable/Navbar";
import NavbarTemp from "../component/reusable/NavbarTemp";
import { useState, useEffect, useMemo } from "react";
import { post_timespent } from "../routes/analytics/post_timespent";
import { post_visitcount } from "../routes/analytics/post_visitcount";
import { BreakTimeProvider } from "../context/TimerComponent";
import FooterTemp from "../component/FooterTemp";
import { SessionProvider } from "next-auth/react";
import { LoginRegisterProvider } from "../context/LoginRegisterContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "../component/api/Login";
import { useRouter } from "next/router";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

import Register from "../component/api/Register";
import ErrorBoundary from "../component/error/ErrorBoundary";

function MyApp(ctx: any) {
  const {
    Component,
    router,
    pageProps: { session, ...pageProps },
    session: cookie,
  } = ctx;
  const [screenTime, setScreenTime] = useState(0);
  const Layout = Component.Layout || EmptyLayout;
  let startScreenTime: any;
  useEffect(() => {
    startScreenTime = performance.now();
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  function handleBeforeUnload() {
    let date = new Date().toJSON().slice(0, 10);
    const newScreenTime = performance.now() - startScreenTime;
    setScreenTime(newScreenTime / 1000 / 60);
    post_timespent(newScreenTime / 1000 / 60, date);
  }
  const clientRouter = useRouter();
  function handleUnload() {
    let date = new Date().toJSON().slice(0, 10);
    post_visitcount(date);
  }
  const MemoizedPageContent = useMemo(
    () => (
      <>
        <ErrorBoundary clientRouter={clientRouter}>
          {
            (router.pathname === "/login" || router.pathname === "/404",
            router.pathname === "/register" ? null : <Navbar ctx={ctx} />)
          }
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </>
    ),
    [Component, pageProps, session]
  );
  // console.log("router pathname", router.pathname, "ctx", ctx);
  return (
    <>
      <title>Reading app</title>
      <SessionProvider session={session}>
        <ThemeProvider theme={Theme}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              autoHideDuration={3000}
              hideIconVariant
              dense
            >
              <BreakTimeProvider>
                <SnackbarProviderMessage>
                  <LoginRegisterProvider>
                    {MemoizedPageContent}

                    <Register />
                    <Login />
                  </LoginRegisterProvider>
                </SnackbarProviderMessage>
              </BreakTimeProvider>
            </SnackbarProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
const EmptyLayout = ({ children }: any) => <>{children}</>;
export default MyApp;
