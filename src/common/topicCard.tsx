import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type TopicCardType = {
  topicname: string;
  topicbody: string;
  topicphoto: string;
  topicvideo: string;
  topiclink: string;
  nsfw: boolean;
  user: string;
  onClick?: () => void;
  onDeleteClick?: () => void;
  type: "default" | "profile";
};

export default function TopicCard(props: TopicCardType): JSX.Element {
  const { type = "default" } = props;

  switch (type) {
    case "default":
      return <Default {...props} />;
    case "profile":
      return <Profile {...props} />;
  }
}

function Default({
  topicname,
  topicbody,
  topicphoto,
  topicvideo,
  topiclink,
  nsfw,
  user,
  onClick,
}: TopicCardType): JSX.Element {
  return (
    <div
      className="bg-gray-800 p-4 w-1/5 mx-auto my-4 text-white text-lg"
      onClick={onClick}
    >
      <h3>
        Topic Name: <span className="text-2xl font-medium">{topicname}</span>
      </h3>
      <p>
        Topic Body: <span className="text-2xl font-medium">{topicbody}</span>
      </p>
      <p>
        Topic Photo: <span className="text-2xl font-medium">{topicphoto}</span>
      </p>
      <p>
        Topic Video: <span className="text-2xl font-medium">{topicvideo}</span>
      </p>
      <p>
        Topic Link: <span className="text-2xl font-medium">{topiclink}</span>
      </p>
      <p>
        nsfw: <span className="text-2xl font-medium">{nsfw.toString()}</span>
      </p>
      <p>
        User: <span className="text-2xl font-medium">{user}</span>
      </p>
    </div>
  );
}

function Profile({
  topicname,
  topicbody,
  topicphoto,
  topicvideo,
  topiclink,
  nsfw,
  user,
  onClick,
  onDeleteClick
}: TopicCardType): JSX.Element {
  return (
    <div
      className="bg-gray-800 p-4 w-1/5 mx-auto my-4 text-white text-lg"
      onClick={onClick}
    >
    <FontAwesomeIcon icon={faTimes} className="p-2 z-0 float-right h-auto bg-red-600" size="3x" onClick={onDeleteClick} />
      <h3>
        Topic Name: <span className="text-2xl font-medium">{topicname}</span>
      </h3>
      <p>
        Topic Body: <span className="text-2xl font-medium">{topicbody}</span>
      </p>
      <p>
        Topic Photo: <span className="text-2xl font-medium">{topicphoto}</span>
      </p>
      <p>
        Topic Video: <span className="text-2xl font-medium">{topicvideo}</span>
      </p>
      <p>
        Topic Link: <span className="text-2xl font-medium">{topiclink}</span>
      </p>
      <p>
        nsfw: <span className="text-2xl font-medium">{nsfw.toString()}</span>
      </p>
      <p>
        User: <span className="text-2xl font-medium">{user}</span>
      </p>
    </div>
  );
}