"use client";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginValidationSchema } from "./loginValidation";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";


const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const {formState:{isSubmitting}}=form;
  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    try{
      const res=await loginUser(data);
      console.log(res)
      if(res.success)
      {
        toast.success(res.message);
      }
    }catch(err:any)
    {
      toast.error(err)
    }
  };
  return (
    <div className="border border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 ">
      <div className="flex items-center  space-x-4">
        <Logo></Logo>
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your Journey
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center">
          <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_ReCAPTCHA_CLIENT_KEY!}
          onChange={handleReCaptcha}
          />
          </div>

          <Button  type="submit" className="mt-5 w-full">
           {
            isSubmitting? "Loging... ":"Login"
           }
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have an account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
