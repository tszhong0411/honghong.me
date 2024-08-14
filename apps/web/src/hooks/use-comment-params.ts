import { parseAsString, useQueryStates } from 'nuqs'

export const useCommentParams = () => {
  return useQueryStates({
    comment: parseAsString,
    reply: parseAsString
  })
}
