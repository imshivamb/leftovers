import { adminAuth } from "@/config/firebase.config";

export class FirebaseAuthService {
    async verifyToken(token: string) {
        try {
            const decodeToken = await adminAuth.verifyIdToken(token);
            return {
                uid: decodeToken.uid,
                phone: decodeToken.phone_number,
                email: decodeToken.email,
                name: decodeToken.name,
                picture: decodeToken.picture,
                provider: decodeToken.firebase.sign_in_provider
            }
        } catch (error) {
            throw new Error("Invalid token")
        }
    }
}