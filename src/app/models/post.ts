export interface Post {
    id: string;
    title: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
    comments_enabled: boolean;
    _links: any;
}
