import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { signOut } from "next-auth/react";
import { useSnackbarContext } from "../../context/snackbarContext";
import { useSession, getSession } from "next-auth/react";

const ProfileComponent = ({ ctx }: any) => {
  const router = useRouter();
  const [opened_profile, set_opened_profile] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { showSucsses, showError } = useSnackbarContext();
  // const { data, status } = useSession();
  const handle_profile_click = () => {
    set_opened_profile(!opened_profile);
  };
  return (
    <div className="relative flex w-full items-center gap-x-4 md:w-auto">
      <div
        className="circle  cursor-pointer rounded-full  bg-primary400"
        onClick={() => {
          handle_profile_click();
        }}
      >
        <p className="h5 uppercase text-white">U</p>
        {opened_profile && (
          <Paper
            className={`${
              isSmallScreen ? "left-0 -top-20" : "right-20 -bottom-20"
            } absolute z-10 h-16 w-24 p-4`}
          >
            <p
              className="hover:text-primary-200 hover:cursor-pointer hover:underline"
              onClick={async () => {
                signOut({ redirect: false });
                showSucsses("Signing out..");
                router.push("/home");
              }}
            >
              Log out
            </p>
          </Paper>
        )}
      </div>
      <p className="text-lg font-normal select-none">
        {/* {data.user?.name?.split(" ")[0] || data.user?.name} */}
      </p>
    </div>
  );
};
export default ProfileComponent;
