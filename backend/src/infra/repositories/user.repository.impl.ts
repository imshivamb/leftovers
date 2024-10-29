import { UserRepository } from "@/core/repositories/user.repository";
import { UserEntity } from "@/core/entities/user.entity";
import { UserModel } from "../database/models/user.model";

export class MongoUserRepository implements UserRepository {
    async findById(id: string): Promise<UserEntity | null> {
        return UserModel.findById(id).lean()
    }
    async findByPhone(phone: string): Promise<UserEntity | null> {
        return UserModel.findOne({ phone }).lean()
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        return UserModel.findOne({ email }).lean()
    }
    async findByFirebaseId(uid: string): Promise<UserEntity | null> {
        return UserModel.findOne({ firebaseUId: uid }).lean()
    }
    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        const user = new UserModel(data)
        return user.save()
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
        const user = await UserModel.findByIdAndUpdate(id, {$set: data}, { new: true })
        if (!user) throw new Error("User not found")
        return user
    }
}