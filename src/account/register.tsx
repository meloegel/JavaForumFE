import * as yup from "yup";
import { useEffect, useState } from "react";
import Button from "../common/button";
import registrationSchema from "../validation/registrationSchema";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = (evt: any) => {
    evt.preventDefault();
  };

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
          <div>
            <label>Email</label>
            <input
              className=""
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
        <div>
          <Button
            text="Register"
            disabled={disabled}
            className=""
            onClick={() => {}}
          />
          <Button
            text="Login"
            className=""
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </form>
    </div>
  );
}
