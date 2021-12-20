import Button from "./button";

type AlertType = {
  title: string;
  body: string;
  visible: boolean;
  confirm?: () => void;
  cancel?: () => void;
};

export default function Alert({
  title,
  body,
  visible,
  confirm,
  cancel,
}: AlertType): JSX.Element {
  return (
    <div className={` ${visible ? "hidden" : "visible"}`}>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="flex">
        <Button text="Confirm" className="text-white" onClick={() => confirm} />
        <Button text="Cancel" className="text-white" onClick={() => cancel} />
      </div>
    </div>
  );
}
