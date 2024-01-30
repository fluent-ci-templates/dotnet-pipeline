import {
  build,
  test,
} from "https://pkg.fluentci.io/dotnet_pipeline@v0.5.1/mod.ts";

await test();
await build();
