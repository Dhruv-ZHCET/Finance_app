const { kpis } = require('./data');
const { PrismaClient } = require('@prisma/client');

async function main(){
    const prisma = new PrismaClient();
    const daywise = kpis[0].dailyData; //array of objects
    for(const each of daywise){
        const res = await prisma.dailyExpenses.create({
            data:{
                Date: each.date,
                Revenue : each.revenue,
                expenses : each.expenses,
                statement_id : 1
            }
        })
    }
    console.log("successfully executed");
}
main();