# Dotnet Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fdotnet_pipeline&query=%24.version)](https://pkg.fluentci.io/dotnet_pipeline)
[![deno module](https://shield.deno.dev/x/dotnet_pipeline)](https://deno.land/x/dotnet_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.42)
[![](https://jsr.io/badges/@fluentci/dotnet)](https://jsr.io/@fluentci/dotnet)
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
fluentci run .
```

## Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger mod install github.com/fluent-ci-templates/dotnet-pipeline@mod
```

## Jobs

| Job   | Description       |
| ----- | ----------------- |
| test  | Run your tests    |
| build | Build the project |

```typescript
build(src?: Directory | string): Promise<Directory | string>

test(src?: Directory | string): Promise<string>
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { build, test } from "jsr:@fluentci/dotnet";

await test();
await build();
```
