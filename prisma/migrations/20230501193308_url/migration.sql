-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "givenUrl" TEXT NOT NULL,
    "generatedUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT,
    CONSTRAINT "Url_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Url" ("createdAt", "generatedUrl", "givenUrl", "id", "updatedAt") SELECT "createdAt", "generatedUrl", "givenUrl", "id", "updatedAt" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_givenUrl_key" ON "Url"("givenUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
