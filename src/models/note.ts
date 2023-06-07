import { InferSchemaType, Schema, model, Document } from 'mongoose'

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export type Note = Document & InferSchemaType<typeof noteSchema>

export default model<Note>('Note', noteSchema)
