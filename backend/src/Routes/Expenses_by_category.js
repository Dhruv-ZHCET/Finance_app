const { kpis } = require('./data');
const { PrismaClient } = require('@prisma/client');

async function main(){
    const prisma = new PrismaClient();
    const expensesByCategory = kpis[0].expensesByCategory;
    const res = await prisma.expenses_by_category.create({
        data :{
            Salaries : expensesByCategory.salaries,
            Services : expensesByCategory.services,
            Supplies : expensesByCategory.supplies,
            statement_id : 1
        }
    })
    console.log("Successfully executed");
}
main();