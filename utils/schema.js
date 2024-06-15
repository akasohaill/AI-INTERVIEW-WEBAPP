import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview= pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBt:varchar('createdBt').notNull(),
    createdAy:varchar('createdAy'),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedbacke:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt')
})