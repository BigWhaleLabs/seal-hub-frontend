export const urlWithBackslash =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)\/$/g

export default function (url: string) {
  return urlWithBackslash.test(url)
}
