import { JobSpec, Workflow } from "fluent_github_actions";

/**
 * Generates a YAML workflow for running tests on the main branch.
 * @returns The generated workflow.
 */
export function generateYaml(): Workflow {
  const workflow = new Workflow("tests");

  const push = {
    branches: ["main"],
  };

  const tests: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        name: "Setup Fluent CI",
        run: "fluentci-io/setup-fluentci@v1",
      },
      {
        name: "Run Dagger Pipelines",
        run: "fluentci run dotnet_pipeline",
      },
    ],
  };

  workflow.on({ push }).jobs({ tests });

  return workflow;
}
