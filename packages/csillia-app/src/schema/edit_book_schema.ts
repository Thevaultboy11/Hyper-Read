import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

export type FormData = {
  resolver: any;
  defaultValues: Yup.InferType<typeof EditBookSchema>;
};

export const EditBookSchema = Yup.object()
  .shape({
    author: Yup.string().required("search is invalid"),
    title: Yup.string().required("search is invalid"),
  })
  .required();
