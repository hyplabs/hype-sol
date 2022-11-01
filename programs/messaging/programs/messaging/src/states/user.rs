use anchor_lang::prelude::*;

#[account]
pub struct User {
    pub owner: Pubkey,
    pub bump: u8,
}

impl User {
    pub const SIZE: usize = 32 + 1;

    pub fn register(&mut self, owner: Pubkey, bump: u8) -> Result<()> {
        self.owner = owner;
        self.bump = bump;

        Ok(())
    }

    pub fn delete(&mut self) -> Result<()> {
        Ok(())
    }
}
