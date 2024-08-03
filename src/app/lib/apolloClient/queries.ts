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

export const GET_TASKS_BY_DATE = gql`
  query getTasksByDate($dates: Dates!) {
    getTasksByDate(dates: $dates) {
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
