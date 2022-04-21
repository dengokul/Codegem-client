import gql from "graphql-tag";

export const GET_FEEDBACK_QUERY = gql`
  query {
    getAllFeedback {
      responseCode
      data
    }
  }
`;

export const SAVE_FEEDBACK_MUTATION = gql`
  mutation ($input: SaveFeedbackRequest) {
    saveFeedback(input: $input) {
      responseCode
      data
    }
  }
`;
