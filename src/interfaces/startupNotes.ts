export type StartupNoteType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
};