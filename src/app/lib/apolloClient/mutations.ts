import { gql } from '@apollo/client';

export const SAVE_TASK = gql`
  mutation saveTask($newTask: InputTask!) {
    saveTask(newTask: $newTask) {
      status
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($updatedTask: UpdatedTaskInput!) {
    updateTask(updatedTask: $updatedTask) {
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(id: $id) {
      status
    }
  }
`;
