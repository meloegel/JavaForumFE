import { useEffect, useState } from "react";
import TopicCard from "../common/topicCard";
import useFetch from "../hooks/useFetch";

const initialTopicValues = {
  topicname: "",
  topicbody: "",
  topicphoto: "",
  topicvideo: "",
  topiclink: "",
  nsfw: "",
  user:{
      username: ""
  },
};

export default function TopicForum(): JSX.Element {
  const [topic, setTopic] = useState(initialTopicValues);
  const token = window.localStorage.getItem("token");
  const topicid = window.location.href.split("/").slice(-1)[0];
  const [getTopic, topicData] = useFetch<any>();

  useEffect(() => {
    console.log(topicid);
    if (topicid) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token!,
      };
      getTopic(`http://localhost:2019/topics/topic/${topicid}`, {
        method: "GET",
        headers: headers,
      });
    }
  }, [token, getTopic, topicid]);

  useEffect(() => {
    console.log(topicData);
    if (topicData) {
      setTopic(topicData);
    }
  }, [topicData]);

  return (
    <div>
      <h2>Forum</h2>
      {topic.topicname !== "" ? (
        <TopicCard
          topicname={topic.topicname}
          topicbody={topic.topicbody}
          topicphoto={topic.topicphoto}
          topicvideo={topic.topicvideo}
          topiclink={topic.topiclink}
          nsfw={JSON.parse(topic.nsfw)}
          user={topic.user.username}
        />
      ) : null}
    </div>
  );
}
