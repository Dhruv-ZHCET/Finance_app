import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono()

app.get('/kpi', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDA0MzFiZDMtOGU2YS00NGYxLWEwZjEtMDFjMjEzNmM4NzcwIiwidGVuYW50X2lkIjoiMDBiZTdlOTkxN2JmYzgyMTY4Njg2YWYxMDQ0YWM0NDQ0YTU0ODY5MzcyMTk5MGUzZWQwYmM2ZDVhYWYwNjQ3YiIsImludGVybmFsX3NlY3JldCI6ImUxM2IxNjcwLTYxZjItNGM4YS04NzllLTJmMzFjMDQ2MjA1ZSJ9.VY1r_bn12ZLip5WuScDpOV1GqDQ3zErjLsdumAiBTI8",
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

  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDA0MzFiZDMtOGU2YS00NGYxLWEwZjEtMDFjMjEzNmM4NzcwIiwidGVuYW50X2lkIjoiMDBiZTdlOTkxN2JmYzgyMTY4Njg2YWYxMDQ0YWM0NDQ0YTU0ODY5MzcyMTk5MGUzZWQwYmM2ZDVhYWYwNjQ3YiIsImludGVybmFsX3NlY3JldCI6ImUxM2IxNjcwLTYxZjItNGM4YS04NzllLTJmMzFjMDQ2MjA1ZSJ9.VY1r_bn12ZLip5WuScDpOV1GqDQ3zErjLsdumAiBTI8",
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

  const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDA0MzFiZDMtOGU2YS00NGYxLWEwZjEtMDFjMjEzNmM4NzcwIiwidGVuYW50X2lkIjoiMDBiZTdlOTkxN2JmYzgyMTY4Njg2YWYxMDQ0YWM0NDQ0YTU0ODY5MzcyMTk5MGUzZWQwYmM2ZDVhYWYwNjQ3YiIsImludGVybmFsX3NlY3JldCI6ImUxM2IxNjcwLTYxZjItNGM4YS04NzllLTJmMzFjMDQ2MjA1ZSJ9.VY1r_bn12ZLip5WuScDpOV1GqDQ3zErjLsdumAiBTI8",
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
