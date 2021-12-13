import { useState } from "react";

const initialFormValues = {
    topicname: "",
    topicbody: "",
    topicphoto: "",
    topicvideo: "",
    topiclink: "",
    nsfw: false,
    user: ""
}

export default function AddTopic(): JSX.Element {
    const [formValues, setFormValues] = useState(initialFormValues);
  return (
    <div>
      
      <form>
          <h2>Add Topic</h2>
          <div>
            <div>
                <label>Topic Name</label>
                <input
                className=""
                value={formValues.topicname}
                onChange={() => {}}
                name="topicname"
                type="text"
                />
            </div>
            <div>
                <label>Topic Body</label>
                <input
                className=""
                value={formValues.topicbody}
                onChange={() => {}}
                name="topicbody"
                type="text"
                />
            </div>
            <div>
                <label>Topic Photo</label>
                <input
                className=""
                value={formValues.topicphoto}
                onChange={() => {}}
                name="topicphoto"
                type="text"
                />
            </div>
            <div>
                <label>Topic Video</label>
                <input
                className=""
                value={formValues.topicvideo}
                onChange={() => {}}
                name="topicvideo"
                type="text"
                />
            </div>
            <div>
                <label>Topic Link</label>
                <input
                className=""
                value={formValues.topiclink}
                onChange={() => {}}
                name="topiclink"
                type="text"
                />
            </div>
            <div>
                <label>Nsfw</label>
                <input
                className=""
                value={formValues.nsfw.toString()}
                onChange={() => {}}
                name="nsfw"
                type="radio"
                />
            </div>

          </div>
      </form>
    </div>
  );
}
