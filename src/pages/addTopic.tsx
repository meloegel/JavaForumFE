import { request } from "https";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const initialFormValues = {
  topicname: "",
  topicbody: "",
  topicphoto: "",
  topicvideo: "",
  topiclink: "",
  nsfw: false,
  user: "",
};

export default function AddTopic(): JSX.Element {
    const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [getUserID, dataUser] = useFetch<any>();
  const [postNewTopic, dataTopic] = useFetch<any>();
  const [nsfw, setNsfw] = useState(false);
  const [userId, setUserId] = useState(0)
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
    setFormValues({
      ...formValues,
      nsfw: nsfw,
    });
    console.log(formValues);
  };

  const onSubmit = (evt:any) => {
    evt.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    postNewTopic(`http://localhost:2019/topics/${userId}/topic`, {
        method:"POST",
        headers:headers
    })
  }

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    getUserID(`http://localhost:2019/users/user/name/${username}`, {
      method: "GET",
      headers: headers,
    });
  }, [getUserID, token, username]);

  useEffect(() => {
    if (dataUser) {
        setUserId(dataUser.userid)
    } else if (dataTopic) {
        navigate("/home")
    }
  }, [dataUser, dataTopic, navigate])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Add Topic</h2>
        <div>
          <div>
            <label>Topic Name</label>
            <input
              className=""
              value={formValues.topicname}
              onChange={onInputChange}
              name="topicname"
              type="text"
            />
          </div>
          <div>
            <label>Topic Body</label>
            <input
              className=""
              value={formValues.topicbody}
              onChange={onInputChange}
              name="topicbody"
              type="text"
            />
          </div>
          <div>
            <label>Topic Photo</label>
            <input
              className=""
              value={formValues.topicphoto}
              onChange={onInputChange}
              name="topicphoto"
              type="text"
            />
          </div>
          <div>
            <label>Topic Video</label>
            <input
              className=""
              value={formValues.topicvideo}
              onChange={onInputChange}
              name="topicvideo"
              type="text"
            />
          </div>
          <div>
            <label>Topic Link</label>
            <input
              className=""
              value={formValues.topiclink}
              onChange={onInputChange}
              name="topiclink"
              type="text"
            />
          </div>
          <div>
            <label>Nsfw</label>
            <input
              className=""
              value={formValues.nsfw.toString()}
              onChange={handleNsfw}
              name="nsfw"
              type="checkbox"
              checked={nsfw}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
