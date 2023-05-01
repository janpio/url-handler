-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "givenUrl" TEXT NOT NULL,
    "generatedUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_givenUrl_key" ON "Url"("givenUrl");
