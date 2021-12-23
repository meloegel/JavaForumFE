import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import TopicCard from "../common/topicCard";
import useFetch from "../hooks/useFetch";

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([] as any[]);
  const [request, data] = useFetch<any>();
  const [logout] = useFetch<any>();
  const token = window.localStorage.getItem("token");

  const handleLogout = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    console.log("fire");
    logout("http://localhost:2019/logout", {
      method: "GET",
      headers: headers,
    });
    navigate("/");
  };

  const handleOnClick = (id: number) => {
    navigate(`/forum/${id}`);
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request("http://localhost:2019/topics/topics", {
      method: "GET",
      headers: headers,
    });
  }, [request, token]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setTopics(data);
    }
  }, [topics, data]);

  return (
    <div>
      <h2 className="text-white text-center text-2xl p-4">Topics</h2>
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
              type="default"
            />
          ))
        : null}
      <div className="flex justify-evenly w-1/3 m-auto p-4">
        <Button
          text="Add Topic"
          className="text-white"
          onClick={() => navigate("/add-topic")}
        />
        <Button
          text="Profile"
          className="text-white"
          onClick={() => navigate("/profile")}
        />
        <Button
          text="My Topics"
          className="text-white"
          onClick={() => navigate("/user-topics")}
        />
        <Button text="Logout" className="text-white" onClick={handleLogout} />
      </div>
    </div>
  );
}
