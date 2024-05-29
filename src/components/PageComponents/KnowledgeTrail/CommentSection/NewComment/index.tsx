import { useState } from 'react';
import {
  ButtonComment,
  ButtonCommentDisabled,
  CommentPhoto,
  Content,
  Image,
  InputComment,
} from './styles';

export const NewComment: React.FC<{
  userName?: string;
  userImage: string;
  createComment: (data: any) => void;
}> = ({ userName, userImage, createComment }): JSX.Element => {
  const [comment, setComment] = useState({
    text: undefined,
    textAreaKey: Date.now(),
  });
  const [canComment, setCanComment] = useState(false);
  function isCanComment(text: string): boolean {
    if (text !== undefined && text !== null) {
      return text.length > 0;
    }
    return false;
  }
  function updateComment(value: string): void {
    setComment({ text: value, textAreaKey: comment.textAreaKey });
    setCanComment(isCanComment(value));
  }
  const publishNewComment = (): void => {
    createComment(comment.text);
    setComment({ text: undefined, textAreaKey: Date.now() });
    setCanComment(isCanComment(undefined));
  };

  return (
    <Content>
      <div>
        <CommentPhoto>
          <Image img={userImage || '/images/user.png'} />
          <InputComment
            key={comment.textAreaKey}
            onChange={event => updateComment(event.target.value)}
            value={comment.text}
          />
        </CommentPhoto>
        {canComment && (
          <ButtonComment onClick={publishNewComment}>Publicar</ButtonComment>
        )}
        {!canComment && <ButtonCommentDisabled>Publicar</ButtonCommentDisabled>}
      </div>
    </Content>
  );
};
