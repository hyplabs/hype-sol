use anchor_lang::prelude::*;

declare_id!("BUhUbDumryZpuG2XKv8N1saRDXL9pMAKsJz6vGPd9ejA"); // TODO: way to load this form anchor.toml?

#[program]
pub mod hello_world {
    use super::*;

    // Just a basic program that returns OK when we call it on-chain.
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

// An account that goes inside a transaction instruction, rent must be paid to store this on-chain for 2 years.
#[derive(Accounts)]
pub struct Initialize {}
