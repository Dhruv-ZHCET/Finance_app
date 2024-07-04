import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'


const app = new Hono()

app.get('/kpi', async (c) => {

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)


  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
}).$extends(withAccelerate())
 const res = await prisma.statements.findMany({
  include:{
    monthlyExpenses:true,
    dailyExpenses:true,
    expenses_by_category:true,
  }
 })
  console.log(res)

  return c.json(res)
})


app.get('/products', async (c) => {

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)


  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
}).$extends(withAccelerate())
 const res = await prisma.product.findMany({
  include:{
    transactions:true,
  }
 })
  console.log(res)

  return c.json(res)
})
app.get('/transactions', async (c) => {

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)


  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
}).$extends(withAccelerate())
 const res = await prisma.transaction.findMany({
  include:{
    Products:true,
  }
 })
  console.log(res)

  return c.json(res)
})

export default app
