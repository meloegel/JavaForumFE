import { useEffect, useState } from "react";
import CommentCard from "../common/commentCard";
import TopicCard from "../common/topicCard";
import useFetch from "../hooks/useFetch";

const initialTopicValues = {
  topicname: "",
  topicbody: "",
  topicphoto: "",
  topicvideo: "",
  topiclink: "",
  nsfw: "",
  user: {
    username: "",
  },
};


export default function TopicForum(): JSX.Element {
  const [topic, setTopic] = useState(initialTopicValues);
  const [comments, setComments] = useState([] as any[]);
  const token = window.localStorage.getItem("token");
  const topicid = window.location.href.split("/").slice(-1)[0];
  const [getTopic, topicData] = useFetch<any>();
  const [getComments, commentData] = useFetch<any>();

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
    console.log(topicid);
    if (topicid) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token!,
      };
      getComments(`http://localhost:2019/comments/comments/${topicid}`, {
        method: "GET",
        headers: headers,
      });
    }
  }, [token, getComments, topicid]);

  useEffect(() => {
    console.log(topicData);
    if (topicData) {
      setTopic(topicData);
    }
  }, [topicData]);

  useEffect(() => {
    console.log(commentData);
    if (commentData) {
      setComments(commentData);
    }
  }, [commentData]);

  return (
    <div>
      <h2 className="text-white text-center text-2xl p-4">Forum</h2>
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
       {comments !== []
        ? comments.map((comment, key): any => (
            <CommentCard
              key={key}
              commentbody={comment.commentbody}
              commentphoto={comment.commentphoto}
              commentvideo={comment.commentvideo}
              commentgif={comment.commentgif}
              user={comment.user.username}
            />
          ))
        : null}
    </div>
  );
}
