use anchor_lang::prelude::*;

declare_id!("BUhUbDumryZpuG2XKv8N1saRDXL9pMAKsJz6vGPd9ejA"); // TODO: load this form anchor.toml?

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
