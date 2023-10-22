import Client, { connect } from "../../deps.ts";

export enum Job {
  test = "test",
  build = "build",
}

export const exclude = [".git", ".fluentci", "bin"];

export const test = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const ctr = client
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

    console.log(result);
  });
  return "Done";
};

export const build = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const ctr = client
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
      .withMountedCache("/app/bin", client.cacheVolume("dotnet-bin"))
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec(["dotnet", "build"]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export type JobExec = (src?: string) =>
  | Promise<string>
  | ((
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
  [Job.build]: build,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Run tests",
  [Job.build]: "Build project",
};
