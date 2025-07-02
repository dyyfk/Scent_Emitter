-- CreateTable
CREATE TABLE "WaitlistUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistUser_email_key" ON "WaitlistUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistUser_token_key" ON "WaitlistUser"("token");
