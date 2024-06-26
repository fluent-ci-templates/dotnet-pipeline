import { brightGreen, stringifyTree } from "../../deps.ts";
import { runnableJobs, jobDescriptions, type Job } from "./jobs.ts";

const tree = {
  name: brightGreen("dotnet_pipeline"),
  children: (Object.keys(runnableJobs) as Job[]).map((job) => ({
    name: jobDescriptions[job]
      ? `${brightGreen(job)} - ${jobDescriptions[job]}`
      : brightGreen(job),
    children: [],
  })),
};

console.log(
  stringifyTree(
    tree,
    (t) => t.name,
    (t) => t.children
  )
);
