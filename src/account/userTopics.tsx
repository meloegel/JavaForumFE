import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function UserTopics(): JSX.Element {
  const [getUserInfo, userInfo] = useFetch<any>();
  const [userId, setUserId] = useState(0);
  const username = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");

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
      setUserId(userInfo.userid);
    }
  }, [userInfo]);

  return (
    <div>
      <h2>User Topics</h2>
    </div>
  );
}
