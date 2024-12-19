import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";

// Enums for jobStatus and jobType
const jobStatuses = ["pending", "interview", "declined"];
const jobTypes = ["full-time", "part-time", "internship"];

// Random job data generator
const generateRandomJobs = (count, userId) => {
  const companies = [
    "Mita",
    "Kazio",
    "Leexo",
    "Trudeo",
    "Kaymbo",
    "Fivespan",
    "Dynazzy",
    "Innojam",
    "Centizu",
    "Oloo",
    "Jaxbean",
    "Viva",
    "Meevee",
    "Cogilith",
    "Quire",
    "Yodo",
    "Rooxo",
    "Babbleopia",
    "Meezzy",
    "Tazz",
    "Brightdog",
    "Trudoo",
    "Aimbu",
    "Browsebug",
    "Feedspan",
    "Linkbuzz",
    "Vimbo",
    "Kwimbee",
    "Yamia",
    "Skibox",
    "Realmix",
    "Fadeo",
    "Kazu",
    "Edgeblab",
  ];

  const positions = [
    "General Manager",
    "Account Coordinator",
    "Operator",
    "Geological Engineer",
    "Chief Design Engineer",
    "Analyst Programmer",
    "Nurse Practitioner",
    "Mechanical Systems Engineer",
    "Administrative Assistant II",
    "VP Accounting",
    "Account Representative I",
    "Nuclear Power Engineer",
    "Senior Quality Engineer",
    "VP Marketing",
    "Cost Accountant",
    "VP Product Management",
    "Structural Engineer",
    "Analog Circuit Design Manager",
    "Safety Technician III",
    "Civil Engineer",
    "Environmental Tech",
    "Geological Engineer",
    "VP Quality Control",
    "Computer Systems Analyst III",
    "Engineer IV",
    "Assistant Manager",
    "GIS Technical Architect",
    "Paralegal",
    "Dental Hygienist",
    "Help Desk Technician",
    "Statistician III",
    "Programmer Analyst III",
    "Programmer IV",
    "Programmer Analyst IV",
  ];

  const locations = [
    "Majzar",
    "Pāvilosta",
    "Baizhifang",
    "Vagonoremont",
    "Ash Shajarah",
    "Jincheng",
    "Aco",
    "Jiebu",
    "Jovellar",
    "Bryan",
    "Bichura",
    "Santa Luzia",
    "Purorejo",
    "København",
    "Dame-Marie",
    "Guaporé",
    "Morinville",
    "Xinxing",
    "Tarko-Sale",
    "Sumbersari Wetan",
    "Weetombo",
    "Mandaon",
    "Al Burayqah",
    "Kasingan",
    "Tohong",
    "Santa Rosa",
    "Olenegorsk",
    "Yangmiao",
    "Dopang",
    "Guihulñgan",
    "Igoumenítsa",
    "Blawi",
    "Thị Trấn Văn Quan",
    "Binglincha",
    "Shajing",
    "Dawuhan",
  ];

  const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomDate = () =>
    new Date(
      Date.now() - Math.floor(Math.random() * 1 * 365 * 24 * 60 * 60 * 1000)
    ).toISOString();

  return Array.from({ length: count }, () => ({
    company: randomElement(companies),
    position: randomElement(positions),
    jobLocation: randomElement(locations),
    jobStatus: randomElement(jobStatuses),
    jobType: randomElement(jobTypes),
    createdAt: randomDate(),
    createdBy: userId,
  }));
};

(async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email: "admin@gmail.com" });
    if (!user) {
      throw new Error("User with email test@test.com not found!");
    }

    console.log(`Found user: ${user.email} with ID: ${user._id}`);

    const jobCount = 50; // Number of jobs to create
    const jobs = generateRandomJobs(jobCount, user._id);

    console.log(`Deleting existing jobs created by user...`);
    await Job.deleteMany({ createdBy: user._id });

    console.log(`Inserting ${jobs.length} jobs...`);
    await Job.create(jobs);

    console.log("Success!!");
    process.exit(0);
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
})();
