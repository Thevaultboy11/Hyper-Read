import { useRouter } from "next/router";
import ProfileComponent from "./ProfileComponent";
import Link from "next/link";
import LoginRegisterComponents from "./LoginRegisterComponents";
import SideNavbar from "./SideNavbar";
import { useSession } from "next-auth/react";
import { BiBookAlt } from "react-icons/bi";
const navigation_link = [
  { title: "Home", route: "/home" },
  { title: "Read now", route: "/read-now" },
  { title: "Library", route: "/library" },
  { title: "Analytics", route: "/analytics" },
  { title: "FAQ", route: "/faq" },
  { title: "Test", route: "/test" },
];
const home_page_link = [
  { title: "Home", route: "/home" },
  { title: "FAQ", route: "/faq" },
];

const Navbar = ({ ctx }: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLogged = status == "authenticated";
  let navigation = home_page_link;
  if (isLogged) {
    navigation = navigation_link;
  }
  return (
    <>
      <div id="wholeNavbar" className="w-full bg-primary200 text-gray-700">
        <div className="mx-auto flex w-full max-w-6xl px-8 md:items-center md:justify-between">
          <div className="mr-auto flex flex-row items-center justify-between  py-6">
            <div className="md:mt-8">
              <Link href="/home">
                <p className="text-yellow-200 text-lg font-bold cursor-pointer">
                  Reading application
                </p>
              </Link>
            </div>
          </div>
          <nav
            id="navbar"
            className="flex h-auto origin-top  flex-row items-center justify-end pb-4 text-white duration-300"
          >
            <div className="hidden md:flex">
              {navigation.map((i: any, idx: number) => {
                return (
                  <Link href={i.route} key={idx}>
                    <p
                      className={`${
                        i.route == router.route ? "text-gray-900 " : ""
                      } mt-2 shadow-outline rounded-lg bg-transparent px-4 py-2 text-sm  focus:outline-none md:mt-8 md:ml-4 cursor-pointer`}
                    >
                      {i.title}{" "}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="block md:hidden">
              <SideNavbar
                navigation={navigation}
                isLogged={isLogged}
                ctx={ctx}
              />
            </div>
            <div className="hidden md:block">
              {!isLogged ? (
                <div className="flex flex-col items-center">
                  <LoginRegisterComponents ctx={ctx} />
                </div>
              ) : (
                <div className="mt-2 flex items-center  gap-x-4 py-2 md:mt-8 md:ml-4">
                  {" "}
                  <ProfileComponent />
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
