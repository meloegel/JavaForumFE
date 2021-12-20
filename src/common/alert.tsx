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
    <div className={`absolute z-0 m-auto w-full ${visible ? "visible" : "hidden"} `}>
      <div className="bg-gray-400 p-8 w-1/2 m-auto">
        <h2 className="text-center">{title}</h2>
        <p className="text-center">{body}</p>
        <div className="flex justify-center">
          <Button
            text="Confirm"
            className="text-white"
            onClick={() => confirm}
          />
          <Button text="Cancel" className="text-white" onClick={() => cancel} />
        </div>
      </div>
    </div>
  );
}
