use anchor_lang::prelude::*;

#[account]
pub struct Message {
    pub from: Pubkey,
    pub to: Pubkey,
    pub message: String,
    pub created_at: u32,
}

impl Message {
    pub const SIZE: usize = 32 + 32 + (512 + 4) + 4;

    pub fn send(&mut self, from: Pubkey, to: Pubkey, message: String) -> Result<()> {
        self.from = from;
        self.to = to;
        self.message = message;
        self.created_at = Clock::get().unwrap().unix_timestamp as u32;

        emit!(NewMessageEvent { from, to });

        Ok(())
    }
}

#[event]
pub struct NewMessageEvent {
    pub from: Pubkey,
    pub to: Pubkey,
}
