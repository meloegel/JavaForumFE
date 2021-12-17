import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import useFetch from "../hooks/useFetch";

const initialFormValues = {
  topicname: "",
  topicbody: "",
  topicphoto: "",
  topicvideo: "",
  topiclink: "",
};

export default function AddTopic(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data] = useFetch<any>();
  const [nsfw, setNsfw] = useState(false);
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

  const handleNsfw = (evt: any) => {
    setNsfw(!nsfw);
  };

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    const body = {
      topicname: formValues.topicname,
      topicbody: formValues.topicbody,
      topicphoto: formValues.topicphoto,
      topicvideo: formValues.topicvideo,
      topiclink: formValues.topiclink,
      nsfw: nsfw,
    };
    request(`http://localhost:2019/topics/${userId}/topic`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
    navigate("/home");
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request(`http://localhost:2019/users/user/name/${username}`, {
      method: "GET",
      headers: headers,
    });
  }, [request, token, username]);

  useEffect(() => {
    if (data) {
      setUserId(data.userid);
    }
  }, [data]);

  return (
    <div>
      <form onSubmit={onSubmit} className="m-auto">
        <h2 className="text-white text-3xl p-6">Add Topic</h2>
        <div className="p-4 text-left ">
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Name</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.topicname}
              onChange={onInputChange}
              name="topicname"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Body</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.topicbody}
              onChange={onInputChange}
              name="topicbody"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Photo</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.topicphoto}
              onChange={onInputChange}
              name="topicphoto"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Video</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.topicvideo}
              onChange={onInputChange}
              name="topicvideo"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Topic Link</label>
            <input
              className="bg-gray-200 border border-black"
              value={formValues.topiclink}
              onChange={onInputChange}
              name="topiclink"
              type="text"
            />
          </div>
          <div className="p-2 flex flex-col w-1/4">
            <label className="text-white mr-2">Nsfw</label>
            <input
              className="bg-gray-200 border border-black"
              value={nsfw.toString()}
              onChange={handleNsfw}
              name="nsfw"
              type="checkbox"
              checked={nsfw}
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
