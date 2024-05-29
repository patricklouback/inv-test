export interface allVideos {
  id: number;
  type: string;
  videoId: number;
  description: string;
  watched: boolean;
  videoIdItem: number | null;
  url: string;
  fileName: string;
  textExplanation?: {
    title?: string;
    target?: string;
    mandatoryDiscussion?: string;
    results?: string;
    textExplanationAtentionPoints?: [
      {
        key: string;
        value: string;
      }
    ];
  };
}
