export type TopicCardType = {
  topicname: string;
  topicbody: string;
  topicphoto: string;
  topicvideo: string;
  topiclink: string;
  nsfw: boolean;
  user: string;
};

export default function TopicCard({
  topicname,
  topicbody,
  topicphoto,
  topicvideo,
  topiclink,
  nsfw,
  user,
}: TopicCardType): JSX.Element {
  return (
    <div>
      <h3>Topic Name: {topicname}</h3>
      <p>Topic Body:{topicbody}</p>
      <p>Topic Photo: {topicphoto}</p>
      <p>Topic Video: {topicvideo}</p>
      <p>Topic Link: {topiclink}</p>
      <p>nsfw: {nsfw.toString()}</p>
      <p>User: {user}</p>
    </div>
  );
}
