export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  likeCount: number;
  commentCount: number;
}
