import { useState } from "react";

const initialFormValues = {
  commentbody: "",
  commentphoto: "",
  commentvideo: "",
  commentgif: "",
};

export default function AddComment(): JSX.Element {
    const [formValues, setFormValues] = useState(initialFormValues);
  return (
    <div>
      <h2>Add Comment</h2>
    </div>
  );
}
