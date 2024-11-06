import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

export type FormData = {
  resolver: any;
  defaultValues: Yup.InferType<typeof LibrarySchema>;
};

export const LibrarySchema = Yup.object()
  .shape({
    search: Yup.string().required("search is invalid"),
  })
  .required();

export const LibraryStaticData: FormData = {
  resolver: yupResolver(LibrarySchema),
  defaultValues: {
    search: "",
  },
};
