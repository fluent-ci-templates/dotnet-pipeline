use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_dotnet;

pub mod helpers;

#[plugin_fn]
pub fn setup() -> FnResult<String> {
    let stdout = setup_dotnet()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    setup_dotnet()?;
    let stdout = dag()
        .pipeline("test")?
        .with_exec(vec!["dotnet", "test", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn build(args: String) -> FnResult<String> {
    setup_dotnet()?;
    let stdout = dag()
        .pipeline("build")?
        .with_exec(vec!["dotnet", "build", &args])?
        .stdout()?;
    Ok(stdout)
}