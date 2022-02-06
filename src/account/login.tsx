import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import useFetch from "../hooks/useFetch";
import loginSchema from "../validation/loginSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialFormValues = {
  username: "",
  password: "",
};

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data] = useFetch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
  });

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const body = {
      grant_type: "password",
      username: formValues.username,
      password: formValues.password,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
    };
    const grant_type = `?grant_type=password&username=${formValues.username}&password=${formValues.password}`;

    request(`http://localhost:2019/login${grant_type}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("username", `${formValues.username}`);
      localStorage.setItem("token", `Bearer ${data.access_token}`);
      navigate("/home");
    }
  }, [data, navigate, formValues]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 m-auto p-4">
        <h2 className="text-white text-center text-2xl">Login</h2>
        <div className="w-4/6 text-right p-4">
          <div className="p-2">
            <label className="text-white mr-2">Username</label>
            <input
              {...register("username")}
              className="bg-gray-200 border border-black m-2"
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
          </div>
          {errors.username && (
            <p className="text-red-600 text-xs m-2">
              {errors.username?.message}
            </p>
          )}
          <div className="p-2">
            <label className="text-white mr-2">Password</label>
            <input
              {...register("password")}
              className="bg-gray-200 border border-black m-2"
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs m-2">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="flex justify-evenly p-6">
          <Button text="Login" className="text-white" onClick={() => {}} />
          <Button
            text="Register"
            className="text-white"
            onClick={() => {
              navigate("/register");
            }}
          />
        </div>
      </form>
    </div>
  );
}
