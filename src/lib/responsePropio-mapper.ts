import { ResponsePropio } from "@/interface";
import { validateProperty } from "./validateProperty";

export const ResponsePropioMapper = (data: any): ResponsePropio => {
  return {
    message: validateProperty<string>(data, "message", "string"),
    error: validateProperty<boolean>(data, "error", "boolean"),
  };
};
