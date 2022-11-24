export const urlWithBackslash =
  /^((?:https?:\/\/)?(?:localhost|[^./]+(?:\.[^./]+)+)(?::\d+)?(?:\/)?)$/

export default function (url: string) {
  return urlWithBackslash.test(url)
}
