-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL,
    "useId" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_useId_key" ON "Accounts"("useId");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_useId_fkey" FOREIGN KEY ("useId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
