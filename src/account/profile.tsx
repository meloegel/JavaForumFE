import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import useFetch from "../hooks/useFetch";

const initialFormValues = {
  username: "",
  password: "",
  email: "",
};

export default function Profile(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [getUserInfo, userInfo] = useFetch<any>();
  const [setUserInfo, newUserInfo] = useFetch<any>();
  const [userId, setUserId] = useState(0);
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

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    const body = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    setUserInfo(`http://localhost:2019/users/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers,
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
      setUserId(userInfo.userid);
      console.log(userInfo.userid);
    }
  }, [userInfo]);

  useEffect(() => {
    if (newUserInfo) {
      setFormValues(newUserInfo);
      window.localStorage.setItem("username", newUserInfo.username);
    }
  }, [newUserInfo]);

  return (
    <div>
      <form onSubmit={onSubmit} className="m-auto ">
        <h2 className="text-white text-3xl p-6">Profile</h2>
        <div className="p-4 text-left ">
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Username</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Password </label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
            <span className="text-xs text-white">**Current password will not be displayed for security reasons**</span>
          </div>
          <div className="p-2 flex flex-col w-1/4">
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
        <div className="px-6 py-2 flex justify-evenly w-1/4">
          <Button text="Submit" className="text-white" onClick={() => {}} />
          <Button
            text="Home"
            className="text-white"
            onClick={() => navigate("/home")}
          />
        </div>
      </form>
    </div>
  );
}
