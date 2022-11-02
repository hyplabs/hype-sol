use anchor_lang::prelude::*;

declare_id!("9oXAL98m2K1TwbphHCSF3Xz1cwqUHvpWTKhXYP8KoF99"); // TODO: load this form anchor.toml?

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
