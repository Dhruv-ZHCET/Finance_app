const { kpis } = require('./data');
const { PrismaClient } = require('@prisma/client');

async function main(){
    const prisma =  new PrismaClient();
    const monthly = kpis[0].monthlyData;
    try{
        for(const each of monthly){
            const res  = await prisma.monthlyExpense.create({
                data : {
                    month : each.month,
                    revenue : each.revenue,
                    operationalExpenses : each.operationalExpenses,
                    nonOperationalExpenses : each.nonOperationalExpenses,
                    expenses : each.expenses,
                    statement_id : 1
                }
            })
        }
        console.log("Successfully completed" );
    }
    catch(e){
        console.log(e);
    }
}
main();