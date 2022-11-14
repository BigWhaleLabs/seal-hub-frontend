export default function (name: string) {
  return navigator.userAgent.toLowerCase().indexOf(name) > -1
}
