-- CreateTable
CREATE TABLE "Statements" (
    "id" SERIAL NOT NULL,
    "Profit" TEXT NOT NULL,
    "TotalRevenue" TEXT NOT NULL,
    "Totalexpense" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Statements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyExpense" (
    "id" SERIAL NOT NULL,
    "statement_id" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "expenses" TEXT NOT NULL,
    "operationalExpenses" TEXT NOT NULL,
    "nonOperationalExpenses" TEXT NOT NULL,

    CONSTRAINT "MonthlyExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenses_by_category" (
    "id" SERIAL NOT NULL,
    "statement_id" INTEGER NOT NULL,
    "Salaries" TEXT NOT NULL,
    "Supplies" TEXT NOT NULL,
    "Services" TEXT NOT NULL,

    CONSTRAINT "Expenses_by_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyExpenses" (
    "id" SERIAL NOT NULL,
    "statement_id" INTEGER NOT NULL,
    "Date" TEXT NOT NULL,
    "Revenue" TEXT NOT NULL,
    "expenses" TEXT NOT NULL,

    CONSTRAINT "DailyExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "Price" TEXT NOT NULL,
    "Expense" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyer" (
    "id" SERIAL NOT NULL,
    "Amount" TEXT NOT NULL,
    "Buyer" TEXT NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relation_product_buyer" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "buyer_id" INTEGER NOT NULL,

    CONSTRAINT "Relation_product_buyer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyExpense" ADD CONSTRAINT "MonthlyExpense_statement_id_fkey" FOREIGN KEY ("statement_id") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses_by_category" ADD CONSTRAINT "Expenses_by_category_statement_id_fkey" FOREIGN KEY ("statement_id") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExpenses" ADD CONSTRAINT "DailyExpenses_statement_id_fkey" FOREIGN KEY ("statement_id") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation_product_buyer" ADD CONSTRAINT "Relation_product_buyer_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation_product_buyer" ADD CONSTRAINT "Relation_product_buyer_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
