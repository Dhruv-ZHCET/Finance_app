const { products} = require('./data');
const { PrismaClient } = require('@prisma/client');

async function main(){
    const prisma = new PrismaClient();
    for(let i=0;i<products.length;i++){
        const res = await prisma.product.create({
            data : {
                id : products[i]._id,
                Price : products[i].price,
                Expense : products[i].expense
            }
        })
    }
    console.log("Success!!!");
}
main();