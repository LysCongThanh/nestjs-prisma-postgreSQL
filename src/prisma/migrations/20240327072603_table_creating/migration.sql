-- CreateTable
CREATE TABLE "group" (
    "it" SERIAL NOT NULL,
    "group_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "group_contact" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER,
    "groupIt" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "group_it_key" ON "group"("it");

-- CreateIndex
CREATE UNIQUE INDEX "group_contact_id_key" ON "group_contact"("id");

-- AddForeignKey
ALTER TABLE "group_contact" ADD CONSTRAINT "group_contact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_contact" ADD CONSTRAINT "group_contact_groupIt_fkey" FOREIGN KEY ("groupIt") REFERENCES "group"("it") ON DELETE SET NULL ON UPDATE CASCADE;
