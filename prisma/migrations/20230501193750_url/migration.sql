/*
  Warnings:

  - A unique constraint covering the columns `[generatedUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_generatedUrl_key" ON "Url"("generatedUrl");
