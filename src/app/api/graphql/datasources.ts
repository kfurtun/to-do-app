import {
  Task,
  InputTask,
  StatusResponse,
  UpdatedTaskInput,
  Dates,
} from './(generatedTypes)/resolversTypes';
import { ObjectId } from 'mongodb';
import { dbName } from '@/app/utils/constants';
import dbConnect from '@/app/utils/dbConnect';
import { getTokenPayload } from '@/app/utils/auth';
import { JWT_ACCESS_SECRET } from '@/app/utils/constants';

export class TaskQueries {
  async getTasks(): Promise<Task[] | null> {
    const accessTokenPayload = await getTokenPayload(
      'todoAT',
      JWT_ACCESS_SECRET
    );
    if (!accessTokenPayload) {
      return null;
    }
    const db = await dbConnect();

    const user = await db
      .db(dbName)
      .collection<Task>('tasks')
      .find({ userEmail: accessTokenPayload.email })
      .toArray();

    return user;
  }

  async getTasksByDate(dates: Dates): Promise<Task[] | null> {
    const accessTokenPayload = await getTokenPayload(
      'todoAT',
      JWT_ACCESS_SECRET
    );
    if (!accessTokenPayload) {
      return null;
    }
    const db = await dbConnect();

    const user = await db
      .db(dbName)
      .collection<Task>('tasks')
      .find({
        $or: [
          {
            $and: [
              { date: { $gte: dates.startDate } },
              { date: { $lte: dates.endDate } },
            ],
          },
          { date: { $lt: dates.todayDate } },
        ],
        userEmail: accessTokenPayload.email,
      })
      .toArray();

    return user;
  }
}

export class TaskMutations {
  async saveTask(newTask: InputTask): Promise<StatusResponse | null> {
    const accessTokenPayload = await getTokenPayload(
      'todoAT',
      JWT_ACCESS_SECRET
    );
    if (!accessTokenPayload) {
      return null;
    }
    const db = await dbConnect();

    const result = await db
      .db(dbName)
      .collection('tasks')
      .insertOne({ ...newTask, userEmail: accessTokenPayload.email });

    if (result) {
      return { status: 'success' };
    }
    return null;
  }

  async deleteTask(id: string): Promise<StatusResponse | null> {
    const accessTokenPayload = await getTokenPayload(
      'todoAT',
      JWT_ACCESS_SECRET
    );
    if (!accessTokenPayload) {
      return null;
    }
    const db = await dbConnect();

    const result = await db
      .db(dbName)
      .collection('tasks')
      .deleteOne({
        _id: new ObjectId(id),
        userEmail: accessTokenPayload.email,
      });

    if (result) {
      return { status: 'success' };
    }
    return null;
  }

  async updateTask(
    updatedTask: UpdatedTaskInput
  ): Promise<StatusResponse | null> {
    const accessTokenPayload = await getTokenPayload(
      'todoAT',
      JWT_ACCESS_SECRET
    );
    if (!accessTokenPayload) {
      return null;
    }
    const db = await dbConnect();

    const result = await db
      .db(dbName)
      .collection('tasks')
      .updateOne(
        {
          _id: new ObjectId(updatedTask._id),
          userEmail: accessTokenPayload.email,
        },
        {
          $set: {
            ...(updatedTask.task !== undefined && { task: updatedTask.task }),
            ...(updatedTask.description !== undefined && {
              description: updatedTask.description,
            }),
            ...(updatedTask.date !== undefined && { date: updatedTask.date }),
            ...(updatedTask.isCompleted !== undefined && {
              isCompleted: updatedTask.isCompleted,
            }),
            ...(updatedTask.reminders !== undefined && {
              reminders: updatedTask.reminders,
            }),
            ...(updatedTask.priority !== undefined && {
              priority: updatedTask.priority,
            }),
          },
        }
      );

    if (result) {
      return { status: 'success' };
    }
    return null;
  }
}
