export interface videoComments {
  id: string;
  videoId: number;
  comments: [
    {
      id: string;
      text: string;
      likes: number;
      commentListId: string;
      userId: string;
      subCommentsList: [
        {
          id: string;
          text: string;
          likes: number;
          commentId: string;
          userId: string;
          liked: boolean;
        }
      ];
      liked: boolean;
    }
  ];
}
