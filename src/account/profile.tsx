import { useEffect, useState } from "react";
import Button from "../common/button";
import useFetch from "../hooks/useFetch";

const initialFormValues = {
  username: "",
  password: "",
  email: "",
};

export default function Profile(): JSX.Element {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [getUserInfo, userInfo] = useFetch<any>();
  const username = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    getUserInfo(`http://localhost:2019/users/user/name/${username}`, {
      method: "GET",
      headers: headers,
    });
  }, [getUserInfo, token, username]);

  useEffect(() => {
    if (userInfo) {
      setFormValues(userInfo);
    }
  }, [userInfo]);

  return (
    <div>
      <form>
        <h2>Profile</h2>
        <div>
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
        <Button text="Submit" className="text-white" onClick={() => {}} />
      </form>
    </div>
  );
}
