import { Schema, Document } from 'mongoose';

export interface User extends Document {
    readonly email: string;
    readonly password: string;
    readonly username: string;
}

export const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);