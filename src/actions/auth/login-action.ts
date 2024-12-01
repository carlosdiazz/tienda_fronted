"use server";

import { signIn } from "@/auth";
import { UserMapper } from "@/components";
import { ResponsePropio } from "@/interface";
import { axiosInstance } from "@/lib";
import { AxiosError } from "axios";

export const loginServer = async (email: string, password: string) => {
  //console.info("loginServer");
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const authData = UserMapper(res.data);
    return authData;
  } catch (e) {
    if (e instanceof AxiosError) {
      const errorMessage = e.response?.data?.message || e.message;
      throw new Error(`Axios => ${errorMessage}`);
    }
    if (e instanceof Error) {
      throw new Error(`${e.message}`);
    }
    throw new Error("Error desconocido 500");
  }
};

export const loginAction = async (
  email: string,
  password: string
): Promise<ResponsePropio> => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      error: false,
      message: "OK",
    };
  } catch (e) {
    console.error(`Error aqui => ${e}`);
    return {
      error: true,
      message: "Error al ingresar!!!",
    };
  }
};
