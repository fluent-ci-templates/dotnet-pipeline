# Dotnet Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/dotnet_pipeline)](https://pkg.fluentci.io/dotnet_pipeline)
[![deno module](https://shield.deno.dev/x/dotnet_pipeline)](https://deno.land/x/dotnet_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.42)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
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
