import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import TopicCard from "../common/topicCard";
import useFetch from "../hooks/useFetch";

export default function Home(): JSX.Element {
const navigate = useNavigate();
const [topics, setTopics] = useState([] as any[]);
const [request, data] = useFetch<any>();
const token = window.localStorage.getItem("token")

const handleLogout = (evt:any) => {
  window.localStorage.clear()
  navigate("/")
}

useEffect(() => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token!
  }
  request("http://localhost:2019/topics/topics", {
    method: "GET",
    headers: headers
  })
}, [request, token])


useEffect(() => {
  console.log(data)
  if (data) {
    setTopics(data);
  }
}, [topics, data])

  return (
    <div>
      <Button
      text="Logout"
      className="text-white"
      onClick={() => handleLogout}
      />
      <h2 className="text-white text-center text-2xl">Topics</h2>
      {topics !== [] ? topics.map((topic, key): any => (
        <TopicCard
        key={key}
        topicname={topic.topicname}
        topicbody={topic.topicbody}
        topicphoto={topic.topicphoto}
        topicvideo={topic.topicvideo}
        topiclink={topic.topiclink}
        nsfw={topic.nsfw}
        user={topic.user.username}
        />
      )): null}
    </div>
  );
}
