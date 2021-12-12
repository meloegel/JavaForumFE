import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../common/button";
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

  const onInputChange = (evt: any) => {
    const name = evt.target.value;
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
    evt.PreventDefault();

    navigate("/home");
  };

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
          <Button text="Login" disabled={disabled} className="" />
        </div>
      </form>
    </div>
  );
}
