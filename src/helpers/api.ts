import ky from 'ky'

const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('User-Agent', 'SealHub')
      },
    ],
  },
})

export default api
