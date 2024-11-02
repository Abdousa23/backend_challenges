import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({
    timestamps: true
})

export class User extends Document {

    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    firstname: string

    @Prop({ required: true })
    lastname: string

    // @Prop({ required: true, match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ })
    @Prop({ required: true })
    password: string

    @Prop({ required: true, unique: true, match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })
    email: string
    @Prop()
    apiKey: string
}


export const UserSchema = SchemaFactory.createForClass(User)