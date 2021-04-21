export interface Comment {
    rating: number;
    userComment: string;
    commentTime: Date;
}

export type CommentForm = Omit<Comment, 'commentTime'>;