use std::vec;

use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_dotnet() -> Result<String, Error> {
    let home = dag().get_env("HOME")?;
    let dotnet_home = format!("{}/.dotnet", home);
    let path = dag().get_env("PATH")?;
    dag().set_envs(vec![
        ("DOTNET_ROOT".into(), dotnet_home.clone()),
        ("PATH".into(), format!("{}/.dotnet:{}", dotnet_home, path)),
    ])?;
    let stdout = dag()
        .pkgx()?
        .with_exec(vec![
            "type dotnet > /dev/null 2>&1 || pkgx curl -fsSL https://dot.net/v1/dotnet-install.sh | bash",
        ])?
        .stdout()?;
    Ok(stdout)
}