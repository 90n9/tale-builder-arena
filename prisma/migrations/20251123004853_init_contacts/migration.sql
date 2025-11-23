-- CreateTable
CREATE TABLE "contacts" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "request_type" VARCHAR(50) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "locale" VARCHAR(5) NOT NULL DEFAULT 'th',
    "user_agent" TEXT,
    "ip_address" VARCHAR(80),
    "referer" TEXT,
    "is_spam" BOOLEAN NOT NULL DEFAULT false,
    "spam_reason" VARCHAR(255),
    "submitted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contacts_submitted_at_idx" ON "contacts"("submitted_at");
