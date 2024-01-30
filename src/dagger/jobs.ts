import { Directory, dag } from "../../sdk/client.gen.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  test = "test",
  build = "build",
}

export const exclude = [".git", ".fluentci", "bin"];

/**
 * @function
 * @description Run tests
 * @param {string | Directory} src
 * @returns {Promise<string>}
 */
export async function test(src: Directory | string = "."): Promise<string> {
  const context = await getDirectory(dag, src);
  const ctr = dag
    .pipeline(Job.test)
    .container()
    .from("alpine")
    .withExec(["apk", "add", "bash", "wget"])
    .withExec([
      "wget",
      "https://dot.net/v1/dotnet-install.sh",
      "-O",
      "dotnet-install.sh",
    ])
    .withExec(["chmod", "+x", "dotnet-install.sh"])
    .withExec(["./dotnet-install.sh"])
    .withExec(["apk", "add", "build-base", "icu-libs"])
    .withEnvVariable("DOTNET_ROOT", "/root/.dotnet")
    .withEnvVariable("PATH", "/root/.dotnet:$PATH", { expand: true })
    .withExec(["dotnet", "--info"])
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["dotnet", "test"]);

  const result = await ctr.stdout();
  return result;
}

/**
 * @function
 * @description Build Project
 * @param {string | Directory} src
 * @returns {Promise<Directory | string>}
 */
export async function build(
  src: Directory | string | undefined = "."
): Promise<Directory | string> {
  const context = await getDirectory(dag, src);
  const ctr = dag
    .pipeline(Job.build)
    .container()
    .from("alpine")
    .withExec(["apk", "add", "bash", "wget"])
    .withExec([
      "wget",
      "https://dot.net/v1/dotnet-install.sh",
      "-O",
      "dotnet-install.sh",
    ])
    .withExec(["chmod", "+x", "dotnet-install.sh"])
    .withExec(["./dotnet-install.sh"])
    .withExec(["apk", "add", "build-base", "icu-libs"])
    .withEnvVariable("DOTNET_ROOT", "/root/.dotnet")
    .withEnvVariable("PATH", "/root/.dotnet:$PATH", { expand: true })
    .withExec(["dotnet", "--info"])
    .withMountedCache("/app/bin", dag.cacheVolume("dotnet-bin"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["dotnet", "build"])
    .withExec(["cp", "-r", "bin", "/dotnet-bin"]);

  await ctr.stdout();
  const id = await ctr.directory("/dotnet-bin").id();
  return id;
}

export type JobExec = (src?: Directory | string) => Promise<Directory | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
  [Job.build]: build,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Run tests",
  [Job.build]: "Build project",
};
