export interface CommentObj {
    skin_id: number;
    content: string;
    id: number;
    created: string;
    last_modified: string;
    likes: number;
    dislikes: number;
    current_user_auth: null | {
        is_modifiable: boolean;
        is_liked: boolean;
        is_disliked: boolean;
    }
}

export interface CommentListObj {
    skin_id?: number;
    num_comments: number;
    skip: number;
    limit: number;
    order_by?: string;
    comments: CommentObj[];
}