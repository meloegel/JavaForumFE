import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import TopicCard from "../common/topicCard";
import useFetch from "../hooks/useFetch";

export default function UserTopics(): JSX.Element {
  const navigate = useNavigate();
  const [getUserInfo, userInfo] = useFetch<any>();
  const [getUserTopics, userTopics] = useFetch<any>();
  const [deleteTopic] = useFetch<any>();
  const [topics, setTopics] = useState([] as any[]);
  const [userId, setUserId] = useState(0);
  const username = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");
  const [confirm, setConfirm] = useState(false);
  const [topicid, setTopicid] = useState(0);

  const handleOnTopicClick = (id: number) => {
    navigate(`/forum/${id}`);
  };

  const handleOnDeleteClick = (topicid: number) => {
    console.log(topicid);
    setConfirm(!confirm);
    setTopicid(topicid);
  };

  const handleOnDeleteConfirm = () => {
    console.log(topicid);
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    deleteTopic(`http://localhost:2019/topics/topic/${topicid}`, {
      method: "DELETE",
      headers: headers,
    });
    setConfirm(!confirm);
    window.location.reload();
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
      <div
        className={`absolute z-0 m-auto w-full ${
          confirm ? "visible" : "hidden"
        } `}
      >
        <div className="bg-gray-400 p-8 w-1/2 m-auto">
          <h2 className="text-center">Alert</h2>
          <p className="text-center">
            Are you sure you would like to delete this topic?
          </p>
          <div className="flex justify-center">
            <Button
              text="Confirm"
              className="text-white"
              onClick={() => handleOnDeleteConfirm()}
            />
            <Button
              text="Cancel"
              className="text-white"
              onClick={() => setConfirm(!confirm)}
            />
          </div>
        </div>
      </div>
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
              onClick={() => handleOnTopicClick(topic.topicid)}
              onDeleteClick={() => handleOnDeleteClick(topic.topicid)}
              type="profile"
            />
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
