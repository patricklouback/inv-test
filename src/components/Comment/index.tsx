/* eslint-disable react/no-array-index-key */
import { UserCard } from '@components/CardUser';
import { WarningTag } from '@components/WarningTag';
import { format } from 'date-fns';
import { IdeaComment } from 'interfaces/idea';
import { HTMLAttributes, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import {
  ChipCommentType,
  FooterComment,
  HeaderComment,
  ItemComment,
  LeftHeaderComment,
  CommentMessage,
} from './styles';

interface CommentProps extends HTMLAttributes<HTMLDivElement> {
  comment: IdeaComment;
  processDevelop?: boolean;
}

export function Comment({
  comment,
  processDevelop = false,
  ...rest
}: CommentProps): JSX.Element {
  const formattedMessage = (message): any => {
    const formattedMessage = message.replace(/@\[([^\]]+)\]/g, '<span class="mention">$1</span>');

  return (
    <CommentMessage dangerouslySetInnerHTML={{ __html: formattedMessage }} />
  );
  } 

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
          {comment.type === 'EVALUATION' 
            ? <WarningTag text={`Para revisão de: ${comment.targetUser.name}`} size='11px' margin= '0rem 2rem'/>
            : null
          }
          <span className="date">
            {format(new Date(comment.createdAt), 'dd/MM/yyyy')}
          </span>
        </LeftHeaderComment>
      </HeaderComment>
      <CommentMessage>{formattedMessage(comment.message)}</CommentMessage>
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
