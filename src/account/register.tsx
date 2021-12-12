import * as yup from "yup";
import { useEffect, useState } from "react";
import Button from "../common/button";
import registrationSchema from "../validation/registrationSchema";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const initialFormValues = {
  username: "",
  password: "",
  email: "",
};

const initialFormErrors = {
  username: "",
  password: "",
  email: "",
};
const initialDisabled = true;

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [request, data] = useFetch<any>();

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    const body = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
    };
    request(`http://localhost:2019/createNewUser`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  useEffect(() => {
    if (data) {
      console.log("Success");
      localStorage.setItem("token", `Bearer ${data.access_token}`);
      navigate("/home");
    }
  }, [data, navigate, formValues]);

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    yup
      .reach(registrationSchema, name)
      .validate(value)
      .then((valid: any) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((error: any) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    registrationSchema.isValid(formValues).then((valid: any) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form onSubmit={onSubmit} className="w-1/2 m-auto p-4">
        <h2 className="text-white text-center text-2xl">Register</h2>
        <div className="w-4/6 text-right p-4">
          <div className="p-2 ">
            <label className="text-white mr-2">Username</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
          </div>
          <div className="p-2">
            <label className="text-white mr-2">Password</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
          </div>
          <div className="p-2">
            <label className="text-white mr-2">Email</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.email}
              onChange={onInputChange}
              name="email"
              type="text"
            />
          </div>
        </div>
        <div>
          <div>{formErrors.username}</div>
          <div>{formErrors.password}</div>
          <div>{formErrors.email}</div>
        </div>
        <div className="flex justify-evenly p-6">
          <Button
            text="Register"
            disabled={disabled}
            className="text-white"
            onClick={() => {}}
          />
          <Button
            text="Login"
            className="text-white"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </form>
    </div>
  );
}
