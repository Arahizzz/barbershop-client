import axios from "axios";
import { apiURL } from "./constants";
import { Comment, CommentForm } from "../models/Comment";

type CommentResponse = Omit<Comment, "commentTime"> & { commentTime: string };

function mapResponse(resp: CommentResponse): Comment {
  return {
    rating: resp.rating,
    userComment: resp.userComment,
    commentTime: new Date(resp.commentTime),
  };
}

export async function getComment(
  recordId: number | string
): Promise<Comment | null> {
  const response = await axios.get<CommentResponse>(`${apiURL}/comments`, {
    params: { recordId },
  });
  const booking = response.data;
  return booking ? mapResponse(booking) : null;
}

export async function getMasterComments(
  masterId: number | string
): Promise<Comment[]> {
  const response = await axios.get<CommentResponse[]>(`${apiURL}/comments/master`, {
    params: { masterId },
  });
  return response.data.map(mapResponse);
}

export async function addComment(
  recordId: number | string,
  comment: CommentForm
) {
  await axios.post(`${apiURL}/comments`, comment, {
    params: { recordId },
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
}
