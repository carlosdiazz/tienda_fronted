"use client";
import { loginAction } from "@/actions";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginFormSchema, LoginFormSchemaType } from "./login.interface";
import { useRouter } from "next/navigation";

export const Loginform = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;
  const router = useRouter();

  async function onSubmit({ email, password }: LoginFormSchemaType) {
    setLoading(true);
    const resp = await loginAction(email, password);
    setLoading(false);
    if (resp.error) {
      toast.error(resp.message);
      return;
    }
    toast.success("Ok");
    router.refresh();
    //await dirigirAHomeAction()
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa su correo"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Ingrese su correo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password */}
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa su contraseña"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Ingrese su contraseña</FormDescription>
                {
                  //errors.password && (
                  //<FormDescription className="text-red-600">
                  //  {errors.password.message}
                  //  </FormDescription>)
                }
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          Login
        </Button>
      </form>
    </Form>
  );
};
