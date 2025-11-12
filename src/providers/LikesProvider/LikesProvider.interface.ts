export interface LikesContextValue {
  likes: string[];
  loading: boolean;
  toggleLike: (klychId: string) => Promise<void>;
}
