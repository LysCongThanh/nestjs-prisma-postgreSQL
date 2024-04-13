-- DropForeignKey
ALTER TABLE "contact" DROP CONSTRAINT "contact_user_id_fkey";

-- DropForeignKey
ALTER TABLE "group_contact" DROP CONSTRAINT "group_contact_contactId_fkey";

-- DropForeignKey
ALTER TABLE "group_contact" DROP CONSTRAINT "group_contact_groupIt_fkey";

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_contact" ADD CONSTRAINT "group_contact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_contact" ADD CONSTRAINT "group_contact_groupIt_fkey" FOREIGN KEY ("groupIt") REFERENCES "group"("it") ON DELETE CASCADE ON UPDATE CASCADE;
