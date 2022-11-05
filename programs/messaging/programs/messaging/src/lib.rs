mod states;
use anchor_lang::prelude::*;
use states::{message::Message, user::User};

declare_id!("3QUUddnWRXhghTBsn6r6Q4DMN4t4y9QrNgVna2Q5BgHb");

#[program]
pub mod messaging {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
        let owner = *ctx.accounts.owner.key;
        let bump = *ctx.bumps.get("user").unwrap();

        ctx.accounts.user.create(owner, bump)
    }

    pub fn delete_user(ctx: Context<DeleteUser>) -> Result<()> {
        ctx.accounts.user.delete()
    }

    pub fn send_message(ctx: Context<SendMessage>, to: Pubkey, message: String) -> Result<()> {
        let from = *ctx.accounts.owner.key;

        ctx.accounts.message.send(from, to, message)
    }
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(init, payer=owner, space=8 + User::SIZE, seeds=[b"user", owner.key().as_ref()], bump)]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteUser<'info> {
    #[account(mut, has_one=owner, close=owner)]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendMessage<'info> {
    #[account(init, payer=owner, space=8 + Message::SIZE)]
    pub message: Account<'info, Message>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
