import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillEye, AiFillFacebook } from "react-icons/ai";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { sign_up } from "../../routes/auth/sign_up";
import router, { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { RegisterData } from "../../schema/register_schema";
import { useSnackbarContext } from "../../context/snackbarContext";
import { animated, useSpring } from "react-spring";
import { GiWhiteBook } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useContext } from "react";
import { LoginRegisterContext } from "../../context/LoginRegisterContext";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

const Register = () => {
  const { showLogin, setShowLogin, showRegister, setShowRegister } =
    useContext(LoginRegisterContext);
  const { data, status } = useSession();
  const router = useRouter();
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleSubmit, control, getValues, register, reset } =
    useForm(RegisterData);
  const { showSucsses, showError } = useSnackbarContext();
  const onSubmit = async (data: any) => {
    const res = await sign_up(
      {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        wpm: 200,
      },
      showSucsses,
      showError
    );
    if (res?.status === 200) {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then(({ ok, error }) => {
        if (ok) {
          setShowRegister(false);
          router.push("/read-now");
        } else {
          showError(`Error with: ${error}`);
        }
      });
    }
  };

  const onError = (err: any) => {
    showError(err[Object.keys(err)[0]].message);
  };

  const el_password = isPasswordVisible ? (
    <AiFillEye />
  ) : (
    <BsFillEyeSlashFill />
  );
  const el_confirm = isPasswordConfirmVisible ? (
    <AiFillEye />
  ) : (
    <BsFillEyeSlashFill />
  );

  const springProps = useSpring({
    opacity: showRegister ? 1 : 0,
    transform: showRegister ? "translateY(-20px)" : "translateY(0)",
    config: { tension: 300, friction: 26 },
    transition: "opacity 500ms ease-out, transform 500ms ease-out",
    minWidth: "max-content",
    width: "100%",
    maxWidth: "400px",
    height: "100%",
    maxHeight: "600px",
    backgroundColor: "rgb(255, 255, 255)",
    zIndex: 50,
    position: "absolute",
    margin: "auto",
    borderRadius: "10px",
  });

  return (
    <>
      {showRegister && (
        <animated.div
          style={springProps}
          className="p-4 md:top-0 md:bottom-0 md:left-0 md:right-0"
        >
          <div className="flex justify-center relative w-full h-full ">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex	w-5/6 max-w-lg flex-col  items-center  justify-center gap-y-8"
            >
              <div className="w-full absolute flex justify-end top-4 right-4">
                <GrClose
                  className="cursor-pointer"
                  size="1.5em"
                  onClick={() => {
                    setShowRegister(false);
                  }}
                />
              </div>

              <div className="flex items-center gap-x-4">
                <GiWhiteBook className="h1 font-bold text-text-main" />
                <h1 className="h1 font-bold text-text-main">Reading app</h1>
              </div>

              <div className="flex flex-col gap-y-2">
                <div className="flex w-full flex-col gap-x-4 md:flex-row">
                  <div className="w-full md:w-1/2">
                    <Controller
                      name="first_name"
                      control={control}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <>
                          {" "}
                          <label className="text-base font-bold text-text-main">
                            First name
                          </label>
                          <TextField
                            onBlur={onBlur} // notify when input is touched
                            onChange={onChange} // send value to hook form
                            inputRef={ref}
                            value={value}
                            error={invalid}
                            helperText={error?.message}
                            fullWidth
                            size="small"
                            placeholder="bil.."
                          />
                        </>
                      )}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Controller
                      name="last_name"
                      control={control}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <>
                          <label className="text-base font-bold text-text-main">
                            Last name
                          </label>
                          <TextField
                            onBlur={onBlur} // notify when input is touched
                            onChange={onChange} // send value to hook form
                            inputRef={ref}
                            value={value}
                            fullWidth
                            size="small"
                            placeholder="smith.."
                          />
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="w-full ">
                  <Controller
                    name="email"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
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
                          error={invalid}
                          helperText={error?.message}
                          fullWidth
                          size="small"
                          placeholder="email"
                        />
                      </>
                    )}
                  />
                </div>
                <div className="w-full">
                  <Controller
                    name="password"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <>
                        <label className="text-base font-bold text-text-main">
                          Password
                        </label>
                        <TextField
                          onBlur={onBlur} // notify when input is touched
                          onChange={onChange} // send value to hook form
                          inputRef={ref}
                          value={value}
                          fullWidth
                          type={isPasswordVisible ? "text" : "password"}
                          error={Boolean(error?.message)}
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => {
                                    setIsPasswordVisible(!isPasswordVisible);
                                  }}
                                >
                                  {el_password}
                                </IconButton>
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
                <div className="w-full">
                  <Controller
                    name="password_confirmation"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <>
                        <label className="text-base font-bold text-text-main">
                          Confirm password
                        </label>
                        <TextField
                          onBlur={onBlur} // notify when input is touched
                          onChange={onChange} // send value to hook form
                          inputRef={ref}
                          value={value}
                          fullWidth
                          type={isPasswordConfirmVisible ? "text" : "password"}
                          error={Boolean(error?.message)}
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => {
                                    setIsPasswordConfirmVisible(
                                      !isPasswordConfirmVisible
                                    );
                                  }}
                                >
                                  {el_confirm}
                                </IconButton>
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
                className="w-full my-4 font-bold rounded-md bg-primary200 hover:bg-primary100 py-3 text-white"
              >
                Register
              </button>
            </form>
          </div>
        </animated.div>
      )}
    </>
  );
};
export default Register;
