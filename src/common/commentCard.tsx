export type CommentCardType = {
  commentbody: string;
  commentphoto: string;
  commentvideo: string;
  commentgif: string;
  user: string;
};

export default function CommentCard({
  commentbody,
  commentphoto,
  commentvideo,
  commentgif,
  user,
}: CommentCardType): JSX.Element {
  return (
    <div>
      <p>
        Comment Body:{" "}
        <span className="text-2xl font-medium">{commentbody}</span>
      </p>
      <p>
        Comment Photo:{" "}
        <span className="text-2xl font-medium">{commentphoto}</span>
      </p>
      <p>
        Comment Video:{" "}
        <span className="text-2xl font-medium">{commentvideo}</span>
      </p>
      <p>
        Comment GIF: <span className="text-2xl font-medium">{commentgif}</span>
      </p>
      <p>
        User: <span className="text-2xl font-medium">{user}</span>
      </p>
    </div>
  );
}
