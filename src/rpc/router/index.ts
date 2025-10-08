import { categoryRouter } from './category'
import { noteRouter } from './note'
import { transactionRouter } from './transaction'
import { userRouter } from './user'

export const router = {
  user: userRouter,
  category: categoryRouter,
  transaction: transactionRouter,
  note: noteRouter,
}
