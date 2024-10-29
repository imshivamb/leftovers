import { UserEntity } from "@/core/entities/user.entity";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<UserEntity>({
    phone: { type: String, sparse: true},
    email: { type: String, sparse: true},
    firebaseUId: { type: String, required: true, unique: true },
    authProvider: { type: String, required: true, enum: ["google", "apple", "phone"] },
    profile: {
        name: { type: String, required: true },
        birthdate: Date,
        gender: String,
        photos: [{
            url: String,
            isMain: { type: Boolean, default: false },
            order: Number
        }],
        bio: { type: String, default: "" },
        prompts: [{
            question: String,
            answer: String
        }],
    },
    settings: {
        discovery: { type: Boolean, default: true },
        distance: { type: Number, default: 50 },
        ageRange: { type: [Number], default: [18, 35] },
        showMe: { type: [String], default: ['all'] },
        notifications: { type: Boolean, default: true }
    },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    password: String,
    status: {
        type: String,
        default: "pending",
        enum: ["active", "pending", "banned"]
    },
    questPreferences: {
        interests: { type: [String], default: [] },
        difficulty: { type: [String], default: [] },
        types: { type: [String], default: [] }
    },
    lastActive: { type: Date, default: Date.now }
    }, { 
    timestamps: true 
});

userSchema.index({ location: '2dsphere' });
userSchema.index({ phone: 1 }, { sparse: true });
userSchema.index({ email: 1 }, { sparse: true });

export const UserModel = mongoose.model<UserEntity>("User", userSchema)