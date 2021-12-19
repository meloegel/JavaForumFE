import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import TopicCard from "../common/topicCard";
import useFetch from "../hooks/useFetch";

export default function UserTopics(): JSX.Element {
  const navigate = useNavigate();
  const [getUserInfo, userInfo] = useFetch<any>();
  const [getUserTopics, userTopics] = useFetch<any>();
  const [topics, setTopics] = useState([] as any[]);
  const [userId, setUserId] = useState(0);
  const username = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");

  const handleOnClick = (id: number) => {
    navigate(`/forum/${id}`);
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
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    getUserTopics(`http://localhost:2019/topics/topics/${userId}`, {
      method: "GET",
      headers: headers,
    });
  }, [getUserTopics, token, userId]);

  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.userid);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userTopics) {
      setTopics(userTopics);
    }
  }, [userTopics]);

  return (
    <div>
      <h2>User Topics</h2>
      <Button
        text="Home"
        className="text-white"
        onClick={() => navigate("/home")}
      />
      {topics !== []
        ? topics.map((topic, key): any => (
            <TopicCard
              key={key}
              topicname={topic.topicname}
              topicbody={topic.topicbody}
              topicphoto={topic.topicphoto}
              topicvideo={topic.topicvideo}
              topiclink={topic.topiclink}
              nsfw={topic.nsfw}
              user={topic.user.username}
              onClick={() => handleOnClick(topic.topicid)}
            />
          ))
        : null}
    </div>
  );
}
