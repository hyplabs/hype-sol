use anchor_lang::prelude::*;

#[account]
pub struct User {
    pub address: Pubkey,
    pub bump: u8,
}

impl User {
    pub const SIZE: usize = 32 + 1;

    pub fn register(&mut self, address: Pubkey, bump: u8) -> Result<()> {
        self.address = address;
        self.bump = bump;

        Ok(())
    }
}
