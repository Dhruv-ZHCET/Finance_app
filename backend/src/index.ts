import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import {signininput,signupinput} from '@haqueinsham/finance-app';

const app = new Hono();

app.use(cors());

app.get("/kpi", async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  const res = await prisma.statements.findMany({
    include: {
      monthlyExpenses: true,
      dailyExpenses: true,
      expenses_by_category: true,
    },
  });
  console.log(res);

  return c.json(res);
});

app.get("/products", async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  const res = await prisma.product.findMany({
    include: {
      transactions: true,
    },
  });
  console.log(res);

  return c.json(res);
});
app.get("/transactions", async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  const res = await prisma.transaction.findMany({
    include: {
      Products: true,
    },
  });
  console.log(res);

  return c.json(res);
});

app.post('/signup', async (c)=>{
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try{
    const {success} = signupinput.safeParse(body);
    if(!success){
      return c.status(402);
    }
    const res  = await prisma.user.create({
      data:{
        email: body.email,
        password: body.password,
        name: body.name,
      }
    })
    if(res){
      return c.json({
        message: 'User created successfully',
      })
    }
  }
  catch(e){
    c.status(404);
    return c.json({
      message: 'User not created',
    })
  }
})

app.post('/signin',async (c)=>{
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try{
    const {success} = signininput.safeParse(body);
    if(!success){
      return c.status(402);
    }
    const res = await prisma.user.findUnique({
      where:{
        email: body.email,
      }
    })
    if(res){
      c.status(200);
      return c.json({
        message: 'Welcome back',
      })
    }
    else{
      c.status(404);
      return c.json({
        message: 'User not found',
      })
    }
  }
  catch(e){
    c.status(404);
    return c.json({
      message: 'Unexpected error ocurred',
    })
  }
})
export default app;
