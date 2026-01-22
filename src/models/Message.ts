import mongoose, { Schema } from 'mongoose';

export type MessageDirection = 'outbound' | 'inbound' | 'system';

export type MessageDoc = {
  _id: mongoose.Types.ObjectId;
  applicationId?: mongoose.Types.ObjectId;
  direction: MessageDirection;
  from?: string;
  to?: string;
  subject?: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

const MessageSchema = new Schema<MessageDoc>(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: false, index: true },
    direction: { type: String, enum: ['outbound', 'inbound', 'system'], required: true },
    from: { type: String, required: false, trim: true },
    to: { type: String, required: false, trim: true },
    subject: { type: String, required: false, trim: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

export const MessageModel =
  mongoose.models.Message || mongoose.model<MessageDoc>('Message', MessageSchema);

