import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
// let jobs = [
//   { id: nanoid(10), company: "apple", position: "front-end" },
//   { id: nanoid(10), comp i//,/.any: "google", position: "back-end" },
// ];

export const getAllJobs = async (req, res) => {
  // console.log(req.user);
  const { search, jobStatus, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ]; // options casing
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortkey = sortOptions[sort] || "newest";

  //setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortkey)
    .skip(skip)         // skip starting values
    .limit(limit); // filter by user

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // used by getAllJobs
  // const { company, position } = req.body;
  const newJob = await Job.create(req.body); // i can send req.body directly , only schema values will be used rest ignored
  res.status(StatusCodes.CREATED).json({ newJob });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  // if (!job) {
  //   throw new NotFoundError(`no job with id : ${id}`);
  //   // return res
  //   // .status(StatusCodes.NOT_FOUND)
  //   // .json({ success: false, message: `Job not found !!! ${id}` });
  // }
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  // const { company, position } = req.body;
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true }); // (id,req.body)
  // if (!updatedJob) {
  //   throw new NotFoundError(`no job with id : ${id}`);

  //   // return res
  //   //   .status(StatusCodes.NOT_FOUND)
  //   //   .json({ success: false, message: `Job not found !!! ${id}` });
  // }

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  // if (!removedJob) {
  //   throw new NotFoundError(`no job with id : ${id}`);

  //   // return res
  //   //   .status(StatusCodes.NOT_FOUND)
  //   //   .json({ success: false, message: `Job not found !!! ${id}` });
  // }
  res.status(StatusCodes.OK).json({ job: removedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  // reducer to simple obj
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((curr) => {
      const {
        _id: { year, month },
        count,
      } = curr;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY"); // in dayjs jan =0 , in mongo db jan =1
      return { date, count };
    }, {})
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
