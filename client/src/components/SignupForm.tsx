import * as yup from "yup";
import useSignup from "../hooks/useSignup";
import useAuth from "../store/useAuth";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

interface SignupForm {
  username: string;
  password: string;
}

const signupSchema = yup.object().shape({
  username: yup.string().required("This field is required"),
  password: yup
    .string()
    .min(8, "Please create a stronger password")
    .required("This field is required"),
});

export default function SignupForm() {
  const { setCredentials } = useAuth();
  const { isPending, mutate } = useSignup();
  const { values, handleSubmit, touched, handleBlur, handleChange, errors } =
    useFormik<SignupForm>({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: signupSchema,
      onSubmit: (formData) => {
        mutate(formData, {
          onError: (err) =>
            toast.error(() => (
              <p className="whitespace-nowrap">{err.response!.data.message}</p>
            )),
          onSuccess: (data) => {
            toast.success("Account successfully created");
            setCredentials(data);
          },
        });
      },
    });

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isPending}
          className="border border-cs-dark px-4 py-3 text-sm outline-none disabled:bg-slate-100"
        />
        {errors.username && touched.username && (
          <p className="text-sm text-red-500">{errors.username}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Atleast 8 characters"
          disabled={isPending}
          className="border border-cs-dark px-4 py-3 text-sm outline-none disabled:bg-slate-100"
        />
        {errors.password && touched.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-cs-dark py-[10px] font-semibold uppercase text-white duration-100 hover:bg-cs-dark/90 active:bg-cs-dark/85 disabled:bg-cs-dark/80"
      >
        {isPending ? "Signing up..." : "Sign up"}
      </button>
      <p className="text-center text-sm">
        Already have an acccount?{" "}
        <Link to={"/"} className="font-bold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
