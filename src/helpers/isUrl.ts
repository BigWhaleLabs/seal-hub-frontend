export const urlWithBackslash =
  /^(http:\/\/localhost:\d+|https:\/\/[\w-]+(\.[\w-]+)+\.?(:\d+)?(?!\/))$/

export default function (url: string) {
  return urlWithBackslash.test(url)
}
