import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

export type FormData = {
  resolver: any;
  defaultValues: Yup.InferType<typeof LoginSchema>;
};

export const LoginSchema = Yup.object()
  .shape({
    email: Yup.string().required("Email is invalid"),
    password: Yup.string().required("You must include"),
  })
  .required();

export const StaticData: FormData = {
  resolver: yupResolver(LoginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
};
