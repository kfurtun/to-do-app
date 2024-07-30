import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query getTasks {
    getTasks {
      _id
      task
      description
      date
      isCompleted
      reminders
      priority
    }
  }
`;
