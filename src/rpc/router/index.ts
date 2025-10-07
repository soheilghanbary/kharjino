import { os } from '@orpc/server'

export const router = {
  sayHello: os.handler(async () => {
    return { message: 'Hello World!' }
  }),
}
