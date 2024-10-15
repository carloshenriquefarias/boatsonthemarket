export type UserDTO = {
    id: string;
    image?: string;
    photo_filename?: string;
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    is_admin?: string;
};