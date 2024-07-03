const { products, transactions} = require('./data');
const { PrismaClient } = require('@prisma/client');

async function main(){
    const prisma = new PrismaClient();
    for (let product of products) {
        for (let transactionId of product.transactions) {
          await prisma.productTransaction.create({
            data: {
              product: {
                connect: {
                  id: product._id,
                },
              },
              transaction: {
                connect: {
                  id: transactionId,
                },
              },
            },
          });
        }
      }
    
      console.log("success!!!!");
    
    }
main();