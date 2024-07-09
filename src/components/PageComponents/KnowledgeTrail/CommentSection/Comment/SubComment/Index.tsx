import { Image } from '../../NewComment/styles';
import {
  CommentArea,
  CommentText,
  ButtonIcon,
  PhotoAndName,
  LikeComponent,
  LikeComponentAndLikes,
  UserAndDate,
  CommentDate,
  NumberOfLikes,
  LikeAndTrash,
  ButtonIconSpace,
} from './styles';
import LikeSvg from '../../../../../../assets/inventta/like.svg';
import LikedSvg from '../../../../../../assets/inventta/liked.svg';
import TrashSvg from '../../../../../../assets/inventta/trash.svg';

export const SubComment: React.FC<{
  userName?: string;
  userImage?: string;
  comment?: string;
  likes?: number;
  liked?: boolean;
  commentId: string;
  createdAt: Date;
  userIsAdmin: boolean;
  userId: string;
  commentUserId: string;
  updateLike: (commentId: string, liked: boolean) => void;
  deleteSubComment: (subCommentId: string) => void;
}> = ({
  userName,
  userImage,
  comment,
  likes,
  liked,
  commentId,
  createdAt,
  userIsAdmin,
  userId,
  commentUserId,
  updateLike,
  deleteSubComment,
}): JSX.Element => {
  function canDeleteSubComment(): boolean {
    return userIsAdmin || commentUserId === userId;
  }
  return (
    <div>
      <CommentArea>
        <UserAndDate>
          <PhotoAndName>
            <Image $img={userImage || '/images/user.png'} />
            <div> {userName} </div>
          </PhotoAndName>
          <CommentDate>{createdAt.toLocaleDateString('pt-BR')}</CommentDate>
        </UserAndDate>
        <CommentText>{comment}</CommentText>
        <LikeComponentAndLikes>
          <NumberOfLikes>{likes}</NumberOfLikes>
          <LikeAndTrash>
            {canDeleteSubComment() && (
              <ButtonIcon onClick={() => deleteSubComment(commentId)}>
                <TrashSvg />
              </ButtonIcon>
            )}
            {/* <div></div> */}
            {!canDeleteSubComment() && <ButtonIconSpace />}
            <LikeComponent>
              <div>
                {!liked && (
                  <ButtonIcon onClick={() => updateLike(commentId, liked)}>
                    <LikeSvg />
                  </ButtonIcon>
                )}
                {liked && (
                  <ButtonIcon onClick={() => updateLike(commentId, liked)}>
                    <LikedSvg />
                  </ButtonIcon>
                )}
              </div>
            </LikeComponent>
          </LikeAndTrash>
        </LikeComponentAndLikes>
      </CommentArea>
    </div>
  );
};
