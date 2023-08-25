# Dotnet Pipeline

[![deno module](https://shield.deno.dev/x/dotnet_pipeline)](https://deno.land/x/dotnet_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/dotnet-pipeline)](https://codecov.io/gh/fluent-ci-templates/dotnet-pipeline)

A ready-to-use CI/CD Pipeline for dotnet projects.


## 🚀 Usage

Run the following command in your project root:

```bash
dagger run fluentci dotnet_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t dotnet
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Jobs

| Job   | Description       |
| ----- | ----------------- |
| test  | Run your tests    |
| build | Build the project |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://deno.land/x/dotnet_pipeline/mod.ts";

const { build, test } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await test(client, src);
    await build(client, src);
  });
}

pipeline();
```
