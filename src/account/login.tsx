import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../common/button";
import useFetch from "../hooks/useFetch";
import loginSchema from "../validation/loginSchema";

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initialDisabled = true;

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [request, data] = useFetch<any>();

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    yup
      .reach(loginSchema, name)
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

  const onSubmit = (evt: any) => {
    evt.preventDefault();
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
        console.log("Success");
        localStorage.setItem("username", `${formValues.username}`);
        localStorage.setItem("token", `Bearer ${data.access_token}`);
        navigate("/home");
      }
    }, [data, navigate, formValues]);

  useEffect(() => {
    loginSchema.isValid(formValues).then((valid: any) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form onSubmit={onSubmit} className="">
        <h2>Login</h2>
        <div>
          <div>
            <label>Username</label>
            <input
              className=""
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className=""
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
          </div>
        </div>
        <div>
          <div>{formErrors.username}</div>
          <div>{formErrors.password}</div>
        </div>
        <div>
          <Button
            text="Login"
            disabled={disabled}
            className=""
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
