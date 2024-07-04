const { kpis } = require('./data');
const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    
    try {
        console.log(kpis[0].totalProfit);

        // Create statement in the database
        const result = await prisma.statements.create({
            data: {
                Profit: kpis[0].totalProfit,
                TotalRevenue: kpis[0].totalRevenue,
                Totalexpense: kpis[0].totalExpenses,
            },
        });

        console.log('Data added to database:', result);
    } catch (error) {
        console.error('Error adding data to database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
