import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findByPhone(phone: string): Promise<UserEntity | null>;
    findByFirebaseId(uid: string): Promise<UserEntity | null>;
    create(data: Partial<UserEntity>): Promise<UserEntity>;
    update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
}