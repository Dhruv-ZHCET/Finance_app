const { transactions} = require('./data');
const { PrismaClient } = require('@prisma/client');

async function main(){
    const prisma = new PrismaClient();
    // console.log(buyers);
    for(let i=0;i<transactions.length;i++){
        const res = await prisma.transaction.create({
            data:{
                id : transactions[i]._id,
                Amount : transactions[i].amount,
                Buyer : transactions[i].buyer
            }
        })
    }
    console.log("Success!!!");
}
main();