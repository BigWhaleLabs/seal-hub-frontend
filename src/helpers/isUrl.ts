export const urlWithBackslash =
  /^(http:\/\/localhost(:\d{1,5})?|https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(:\d{1,5})?)$/i

export default function (url: string) {
  return urlWithBackslash.test(url)
}
