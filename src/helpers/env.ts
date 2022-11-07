import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ALCHEMY_API_KEY: str(),
  VITE_WC_PROJECT_ID: str(),
})
