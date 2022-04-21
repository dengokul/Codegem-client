import { useCallback } from "react";
import { isSuccess } from "utils/ServiceAPIUtil";
import { GET_FEEDBACK_QUERY, SAVE_FEEDBACK_MUTATION } from "graphql/feedback";
import { useMutation, useApolloClient } from "@apollo/client";

const FeedbackService = () => {
  const apolloClient = useApolloClient();
  const [saveFeedback] = useMutation(SAVE_FEEDBACK_MUTATION);

  const GetAllFeedback = useCallback(async () => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FEEDBACK_QUERY,
        // variables: { input: { date } },
        fetchPolicy: "no-cache",
      });
      if (isSuccess("getAllFeedback", data)) {
        return data.getAllFeedback.data;
      }
    } catch (error) {
      return null;
    }
    // eslint-disable-next-line
  }, []);

  const SaveFeedback = useCallback(async (values) => {
    try {
      const { data } = await saveFeedback({
        variables: { input: values },
      });

      if (isSuccess("saveFeedback", data)) {
        return data.saveFeedback.data;
      }
    } catch (error) {
      console.log("[Error] - Save Feedback Failed!");
      throw error;
    }
    // eslint-disable-next-line
  }, []);

  return {
    SaveFeedback,
    GetAllFeedback,
  };
};

export default FeedbackService;
