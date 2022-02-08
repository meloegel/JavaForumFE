import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import useFetch from "../hooks/useFetch";

const initialFormValues = {
  commentbody: "",
  commentphoto: "",
  commentvideo: "",
  commentgif: "",
};

export default function AddComment(): JSX.Element {
  const navigate = useNavigate();
  const {handleSubmit} = useForm();
  const [userId, setUserId] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [getUserData, userData] = useFetch<any>();
  const [addComment, commentData] = useFetch<any>();
  const username = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");
  const topicid = window.location.href.split("/").slice(-1)[0];
 

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    const body = {
      commentbody: formValues.commentbody,
      commentphoto: formValues.commentphoto,
      commentvideo: formValues.commentvideo,
      commentgif: formValues.commentgif,
    };
    addComment(`http://localhost:2019/comments/${userId}/${topicid}/comment`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    getUserData(`http://localhost:2019/users/user/name/${username}`, {
      method: "GET",
      headers: headers,
    });
  }, [getUserData, token, username]);

  useEffect(() => {
    if (userData) {
      setUserId(userData.userid);
    }
  }, [userData]);

  useEffect(() => {
    if (commentData) {
      navigate(`/forum/${topicid}`);
    }
  }, [commentData, navigate, topicid]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-auto">
        <h2 className="text-white text-3xl p-6">Add Comment</h2>
        <div className="p-4 text-left ">
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Name</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.commentbody}
              onChange={onInputChange}
              name="commentbody"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Body</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.commentphoto}
              onChange={onInputChange}
              name="commentphoto"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Photo</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.commentvideo}
              onChange={onInputChange}
              name="commentvideo"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Video</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.commentgif}
              onChange={onInputChange}
              name="commentgif"
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
