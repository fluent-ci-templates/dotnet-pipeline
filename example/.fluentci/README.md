# Dotnet Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fdotnet_pipeline&query=%24.version)](https://pkg.fluentci.io/dotnet_pipeline)
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
import { build, test } from "https://pkg.fluentci.io/dotnet_pipeline@v0.3.0/mod.ts";

await test();
await build();
```
