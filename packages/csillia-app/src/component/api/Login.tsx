import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillFacebook, AiOutlineLock } from "react-icons/ai";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { LoginSchema } from "../../schema/login_schema";
import { useForm, Controller } from "react-hook-form";
import { BsFillEyeSlashFill, BsPeople } from "react-icons/bs";
import Link from "next/link";
import { log_in } from "../../routes/auth/login";

import { useRouter } from "next/router";
import { useSnackbarContext } from "../../context/snackbarContext";
import { GiWhiteBook } from "react-icons/gi";
import { signIn } from "next-auth/react";
import { animated, useSpring } from "react-spring";
import { GrClose } from "react-icons/gr";

import { useMediaQuery } from "@material-ui/core";
import { SnackbarContext } from "../../context/snackbarContext";
import { LoginRegisterContext } from "../../context/LoginRegisterContext";
import { useSession, getSession } from "next-auth/react";
import { get_is_admin } from "../../routes/auth/get_is_admin";
const Login = () => {
  const { showLogin, setShowLogin, showRegister, setShowRegister } =
    useContext(LoginRegisterContext);
  const router = useRouter();
  const { handleSubmit, control, getValues, register, reset } =
    useForm(LoginSchema);
  const [showPassword, setShowPassword] = useState(false);
  const { showSucsses, showError } = useSnackbarContext();
  const onSubmit = async (data: any) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(async ({ ok, error }) => {
      if (ok) {
        showSucsses("Wellcome");
        setShowLogin(false);
        router.push("/read-now");
      } else {
        showError(`Error with: ${error}`);
      }
    });
    // console.log(await get_is_admin());
  };
  const onError = (err: any) => {
    for (const key in err) {
      if (err.hasOwnProperty(key)) {
        if (key === "email") {
          if (err[key].type == "pattern") {
            showError(`Invalid email format`);
          } else if (err[key].type == "required") {
            showError(`You must enter the email`);
          }
        }
        if (key === "password") {
          showError(`You must enter the password`);
        }

        // Custom console.log
      }
    }
    // showError(err.email);
  };

  const springProps = useSpring({
    opacity: showLogin ? 1 : 0,
    transform: showLogin ? "translateY(-20px)" : "translateY(0)",
    config: { tension: 300, friction: 26 },
    transition: "opacity 500ms ease-out, transform 500ms ease-out",
    minWidth: "max-content",
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    maxHeight: "600px",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "20px",
    zIndex: 50,
    position: "absolute",
    margin: "auto",
    borderRadius: "10px",
  });
  const el = showPassword ? <AiFillEye /> : <BsFillEyeSlashFill />;
  return (
    <>
      {showLogin && (
        <animated.div
          className=" md:top-0 md:bottom-0 md:left-0 md:right-0"
          style={springProps}
        >
          <div className="flex justify-center relative w-full h-full ">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex	w-5/6 max-w-lg flex-col  items-center  justify-center gap-y-8  "
            >
              <div className="w-full absolute flex justify-end top-0 right-0">
                <GrClose
                  className="cursor-pointer"
                  size="1.5em"
                  onClick={() => {
                    setShowLogin(false);
                  }}
                />
              </div>

              <div className="row mt-20 mb-5">
                <div className="col-12 justify-self-center flex">
                  <GiWhiteBook className="inline-block h1 font-bold text-text-main" />
                  <h1 className="ml-1 inline-block h1 font-bold text-text-main">
                    Reading app
                  </h1>
                </div>
              </div>
              <div className="flex  flex-col gap-y-4  w-full">
                <div className="my-4 flex w-full items-center justify-center gap-2">
                  <div className="h-2 w-1/2 border-t-2 border-gray-200 "></div>
                  <div className="h-2 text-gray-400">Or</div>
                  <div className="h-2 w-1/2 border-t-2 border-gray-200 "></div>
                </div>
                <div className="flex-col flex gap-y-4">
                  <div className="w-full">
                    <Controller
                      rules={{ required: true, pattern: /^\S+@\S+$/i }}
                      name="email"
                      control={control}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }: any) => (
                        <>
                          {" "}
                          <label className="text-base font-bold text-text-main">
                            Email
                          </label>
                          <TextField
                            onBlur={onBlur} // notify when input is touched
                            onChange={onChange} // send value to hook form
                            inputRef={ref}
                            value={value}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BsPeople />
                                </InputAdornment>
                              ),
                            }}
                            fullWidth
                            size="small"
                            placeholder="Email"
                          />
                        </>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <div className="w-full flex justify-between">
                      <label className="text-base font-bold text-text-main">
                        Password
                      </label>
                    </div>

                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: true }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }: any) => (
                        <>
                          <TextField
                            onBlur={onBlur} // notify when input is touched
                            onChange={onChange} // send value to hook form
                            inputRef={ref}
                            value={value}
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            error={Boolean(error?.message)}
                            InputProps={{
                              // <-- This is where the toggle button is added.

                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                  >
                                    {el}
                                  </IconButton>
                                </InputAdornment>
                              ),
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AiOutlineLock />
                                </InputAdornment>
                              ),
                            }}
                            size="small"
                            placeholder="password"
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full font-bold rounded-md bg-primary200 hover:bg-primary100 py-3 text-white"
                >
                  Sing in
                </button>
              </div>
            </form>
          </div>
        </animated.div>
      )}
    </>
  );
};
export default Login;
