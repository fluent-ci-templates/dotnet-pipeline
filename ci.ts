import {
  build,
  test,
} from "https://pkg.fluentci.io/dotnet_pipeline@v0.3.0/mod.ts";

await test();
await build();
