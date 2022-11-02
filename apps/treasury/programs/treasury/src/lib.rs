use anchor_lang::prelude::*;

declare_id!("4DCF7Nifq254YUpeKyV267vQHBR7Xuc1a16hCwg3AByg");

#[program]
pub mod treasury {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
