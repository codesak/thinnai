import Order, { IORDER } from '../../models/Order'

const createOrder = async (order: Partial<IORDER>) => {
  const newOrder = new Order(order)
  await newOrder.save()
  return newOrder
}

export default createOrder
