import mongoose,{ Document, Schema} from "mongoose";

export interface ISubscriber {
    email: string;
    isSubscribed: boolean;
    unSubscribedAt: Date;
}

export interface ISubscriberModel extends ISubscriber, Document{ }

const SubscriberSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already subscribed"]
        },
        isSubscribed: {
            type: Boolean,
            default: true
        },
        unSubscribedAt: {
            type: Date,
            default:null
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model<ISubscriberModel>('Subscriber', SubscriberSchema);