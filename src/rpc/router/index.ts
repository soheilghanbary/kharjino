import { categoryRouter } from './category'
import { transactionRouter } from './transaction'
import { userRouter } from './user'

export const router = {
  user: userRouter,
  category: categoryRouter,
  transaction: transactionRouter,
}
