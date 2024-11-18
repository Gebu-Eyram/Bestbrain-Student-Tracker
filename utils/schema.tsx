import { int } from "drizzle-orm/mysql-core";
import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const Schools = pgTable("schools", {
  id: varchar("id").notNull().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  picture: varchar("picture").notNull(),
  desc: varchar("desc").notNull(),
  contact: varchar("contact", { length: 10 }).notNull(),
  address: varchar("address").notNull(),
  region: varchar("region").notNull(),
  createdAt: varchar("created_at")
    .notNull()
    .default(new Date().toISOString().split("T")[0]),
});
export const Examinations = pgTable("examinations", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  status: varchar("status").notNull().default("inactive"),
  createdAt: date("created_at")
    .notNull()
    .default(new Date().toISOString().split("T")[0]),
  type: varchar("type", { length: 10 }).notNull(),
});

export const Users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").notNull(),
  picture: varchar("picture").notNull(),
  role: varchar("role").notNull().default("user"),
});

export const Students = pgTable("students", {
  id: varchar("id").primaryKey(),
  school_id: varchar("school_id").notNull(),
  school: varchar("school").notNull(),
  name: varchar("name").notNull(),
  createdAt: varchar("created_at")
    .notNull()
    .default(new Date().toISOString().split("T")[0]),
});

export const ScoreTable = pgTable("scoreTable", {
  id: serial("id").primaryKey(),
  //Student details
  name: varchar("name").notNull(),
  student_id: varchar("student_id").notNull(),
  //School details
  school_name: varchar("school_name").notNull(),
  school_id: varchar("school_id").notNull(),
  //Exams details
  exams_id: varchar("exams_id").notNull(),

  // Core subjects

  //Maths
  math_A: integer("math_A").default(0),
  math_B: integer("math_B").default(0),
  math_tot: integer("math_tot").default(0),

  //Science
  science_A: integer("science_A").default(0),
  science_B: integer("science_B").default(0),
  science_tot: integer("science_tot").default(0),

  //Social
  social_A: integer("social_A").default(0),
  social_B: integer("social_B").default(0),
  social_tot: integer("social_tot").default(0),

  //English
  english_A: integer("english_A").default(0),
  english_B: integer("english_B").default(0),
  english_tot: integer("english_tot").default(0),

  // Elective subjects

  //Creative Arts
  c_arts_A: integer("c_arts_A").default(0),
  c_arts_B: integer("c_arts_B").default(0),
  c_arts_tot: integer("c_arts_tot").default(0),

  //Computing
  comp_A: integer("comp_A").default(0),
  comp_B: integer("comp_B").default(0),
  comp_tot: integer("comp_tot").default(0),

  //French
  french_A: integer("french_A").default(0),
  french_B: integer("french_B").default(0),
  french_tot: integer("french_tot").default(0),

  //Ghanaian Language
  gh_lang_A: integer("gh_lang_A").default(0),
  gh_lang_B: integer("gh_lang_B").default(0),
  gh_lang_tot: integer("gh_lang_tot").default(0),

  //RME
  rme_A: integer("rme_A").default(0),
  rme_B: integer("rme_B").default(0),
  rme_tot: integer("rme_tot").default(0),

  //Career Technology
  career_A: integer("career_A").default(0),
  career_B: integer("career_B").default(0),
  career_tot: integer("career_tot").default(0),

  //Overall
  overall: integer("overall").default(0),
});

export const schoolDatabase = pgTable("schoolDatabase", {
  id: serial("id").primaryKey(),
  schoolName: text("school_name"),
  headName: text("head_name"),
  contact: text("contact"),
  location: text("location"),
  email: text("email"),
  district: text("district"),
  region: text("region"),
  type: text("type"),
});
