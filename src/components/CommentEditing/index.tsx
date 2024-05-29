import { UserCard } from '@components/CardUser';
import { format } from 'date-fns';
import { IdeaComment } from 'interfaces/idea';
import { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import {
  ChipCommentType,
  FooterComment,
  HeaderComment,
  ItemComment,
  LeftHeaderComment,
  Input
} from './styles';

interface CommentEditingProps extends HTMLAttributes<HTMLDivElement> {
  comment: IdeaComment;
  processDevelop?: boolean;
  commentToParentComponent: (message: string) => void;
}

export function CommentEditing({
  comment,
  processDevelop = false,
  commentToParentComponent,
  ...rest
}: CommentEditingProps): JSX.Element {
  const [commentEdited, setCommentEdited] = useState(comment.message);

  const handleChange = useCallback(
    async (event) => {
      setCommentEdited(event.target.value);
      commentToParentComponent(event.target.value);
    },
    []
  )

  return (
    <ItemComment key={comment.id} {...rest}>
      <HeaderComment>
        <UserCard name={comment?.user.name} image={comment.user?.image} />
        <LeftHeaderComment>
          {/* {processDevelop && comment?.isInternalComment && (
            <ChipCommentType isInternalComment={comment.isInternalComment}>
              Análise técnica
            </ChipCommentType>
          )} */}
          <span className="date">
            {format(new Date(comment.createdAt), 'dd/MM/yyyy')}
          </span>
        </LeftHeaderComment>
      </HeaderComment>
      <Input 
        placeholder={comment.message}
        onChange={event =>
          handleChange(event)
        }
        value={commentEdited}
      />
      <FooterComment>
        {comment.ideaCommentFiles?.length > 0 && (
          <a
            href={comment.ideaCommentFiles[0].url}
            target="_blank"
            rel="noreferrer"
          >
            <FiDownload />
            Abrir {comment.ideaCommentFiles[0].originalName}
          </a>
        )}
      </FooterComment>
    </ItemComment>
  );
}
