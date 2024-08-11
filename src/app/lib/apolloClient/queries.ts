import { gql } from '@apollo/client';

const taskFragment = gql`
  fragment taskFields on Task {
    _id
    task
    description
    date
    isCompleted
    reminders
    priority
    completedOn
  }
`;

export const GET_TASKS = gql`
  ${taskFragment}
  query getTasks {
    getTasks {
      ...taskFields
    }
  }
`;

export const GET_TASKS_BY_DATE = gql`
  ${taskFragment}
  query getTasksByDate($dates: Dates!) {
    getTasksByDate(dates: $dates) {
      ...taskFields
    }
  }
`;

export const GET_COMPLETED_TASKS = gql`
  ${taskFragment}
  query getCompletedTasks($loadMoreVars: LoadMoreVars!) {
    getCompletedTasks(loadMoreVars: $loadMoreVars) {
      tasks {
        ...taskFields
      }
      dates
      totalCount
    }
  }
`;
