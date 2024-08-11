import {
  Task,
  InputTask,
  StatusResponse,
  UpdatedTaskInput,
  Dates,
  CompletedTasks,
  LoadMoreVars,
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

    const tasks = await db
      .db(dbName)
      .collection<Task>('tasks')
      .find({ userEmail: accessTokenPayload.email })
      .toArray();

    return tasks;
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

    const tasks = await db
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

    return tasks;
  }

  async getCompletedTasks(
    loadMoreVars: LoadMoreVars
  ): Promise<CompletedTasks | null> {
    const accessTokenPayload = await getTokenPayload(
      'todoAT',
      JWT_ACCESS_SECRET
    );
    if (!accessTokenPayload) {
      return null;
    }
    const db = await dbConnect();
    const totalCount = await db.db(dbName).collection('tasks').countDocuments({
      isCompleted: true,
      userEmail: accessTokenPayload.email,
    });

    const tasks = await db
      .db(dbName)
      .collection<Task>('tasks')
      .find({
        isCompleted: true,
        userEmail: accessTokenPayload.email,
      })
      .sort({ date: -1 })
      .skip(loadMoreVars.skip)
      .limit(loadMoreVars.limit)
      .toArray();

    const dates = new Set(tasks.map((task) => task.date));
    const datesArray = Array.from(dates);

    return { dates: datesArray, tasks, totalCount };
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
            ...(updatedTask.completedOn !== undefined && {
              completedOn: updatedTask.completedOn,
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
