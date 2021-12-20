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

  const handleOnTopicClick = (id: number) => {
    navigate(`/forum/${id}`);
  };

  const handleOnDeleteClick = (topicid: number) => {
    console.log(topicid);
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
    <div className="">
      <h2 className="text-white text-3xl p-6 text-center">User Topics</h2>
      {topics !== []
        ? topics.map((topic, key): any => (
            <div className="flex flex-col">
              <TopicCard
                key={key}
                topicname={topic.topicname}
                topicbody={topic.topicbody}
                topicphoto={topic.topicphoto}
                topicvideo={topic.topicvideo}
                topiclink={topic.topiclink}
                nsfw={topic.nsfw}
                user={topic.user.username}
                onClick={() => handleOnTopicClick(topic.topicid)}
              />
              <div className="m-auto">
                <Button
                  text="Delete"
                  className="text-white"
                  onClick={() => handleOnDeleteClick(topic.topicid)}
                />
              </div>
            </div>
          ))
        : null}
      <div className="text-center p-4">
        <Button
          text="Home"
          className="text-white"
          onClick={() => navigate("/home")}
        />
      </div>
    </div>
  );
}
