import mongoose, { Document, Schema, Types } from "mongoose";

const TaskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface ITask extends Document {
  // Asignación con Interface
  taskName: string;
  description: string;
  project: Types.ObjectId;
  taskStatus: TaskStatusType;
}

const TaskSchema: Schema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      required: true,
    },
    taskStatus: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
