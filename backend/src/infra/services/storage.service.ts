import { Storage } from "@google-cloud/storage";
import { Express } from "express";
import sharp from "sharp";
import {v4 as uuid4} from 'uuid';

export class StorageService {
    private storage: Storage;
    private bucket: string;

    constructor() {
        this.storage = new Storage({
            projectId: process.env.FIREBASE_PROJECT_ID,
            credentials: {
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                private_key: process.env.FIREBASE_PRIVATE_KEY,
            },
        });
        this.bucket = process.env.FIREBASE_STORAGE_BUCKET!;
    }
    async uploadPhoto(file: Express.Multer.File): Promise<string> {
        const optimizedBuffer = await sharp(file.buffer)
        .resize(1080, 1080, { fit: 'inside' })
        .jpeg({ quality: 80 })
        .toBuffer();

        const fileName = `photos/${uuid4()}.jpg`;
        const fileUpload = this.storage.bucket(this.bucket).file(fileName);

        await fileUpload.save(optimizedBuffer, {
            metadata: {
                contentType: 'image/jpeg'
            }
        });

        return `https://storage.googleapis.com/${this.bucket}/${fileName}`;

    }
}