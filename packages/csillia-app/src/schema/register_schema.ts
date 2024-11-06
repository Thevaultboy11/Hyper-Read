import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

export type FormData = {
  resolver: any;
  defaultValues: Yup.InferType<typeof RegisterSchema>;
};

export const RegisterSchema = Yup.object({
  first_name: Yup.string().required("You must include first name"),
  last_name: Yup.string().required("You must include lastname"),
  email: Yup.string().required("Email is invalid"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const RegisterData: FormData = {
  resolver: yupResolver(RegisterSchema),
  defaultValues: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
};
