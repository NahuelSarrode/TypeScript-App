export interface Post {
    id?: number, 
    title: string, 
    description: string, 
    image_url: string, 
    user_id: string,
    created_at?: Date
}