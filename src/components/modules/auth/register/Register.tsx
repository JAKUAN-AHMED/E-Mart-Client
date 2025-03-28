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
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {formState:{isSubmitting}}=form;
  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    try{
      const res=await registerUser(data);
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
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your Journey
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
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
          {/* password confirm */}
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                {passwordConfirm && (password != passwordConfirm) ? (
                  <FormMessage>Password does not match</FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
          <Button  type="submit" className="mt-5 w-full">
           {
            isSubmitting? "Registering ":"Register"
           }
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account ?
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
