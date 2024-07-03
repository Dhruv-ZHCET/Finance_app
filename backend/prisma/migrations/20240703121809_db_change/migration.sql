/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relation_product_buyer` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `revenue` on the `MonthlyExpense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Relation_product_buyer" DROP CONSTRAINT "Relation_product_buyer_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "Relation_product_buyer" DROP CONSTRAINT "Relation_product_buyer_product_id_fkey";

-- AlterTable
ALTER TABLE "MonthlyExpense" DROP COLUMN "revenue",
ADD COLUMN     "revenue" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- DropTable
DROP TABLE "Buyer";

-- DropTable
DROP TABLE "Relation_product_buyer";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "Amount" TEXT NOT NULL,
    "Buyer" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTransaction" (
    "Pr_id" TEXT NOT NULL,
    "Tr_id" TEXT NOT NULL,

    CONSTRAINT "ProductTransaction_pkey" PRIMARY KEY ("Tr_id","Pr_id")
);

-- AddForeignKey
ALTER TABLE "ProductTransaction" ADD CONSTRAINT "ProductTransaction_Pr_id_fkey" FOREIGN KEY ("Pr_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTransaction" ADD CONSTRAINT "ProductTransaction_Tr_id_fkey" FOREIGN KEY ("Tr_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
