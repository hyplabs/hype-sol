// This defines the interface for our on-chain program.
// ...Any client calling this program with the proper base_account can call these RPC methods.
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("AE2B8TSeXLjSR59VQDsmwjUkvmHtwgDUXnDs9xP12STi");

#[program]
mod counter {
    use super::*;

    // These fns are RPC request handlers that we will be able to call from a client application to interact with the program.
    // Context structs describe the context that will be passed in when the function is called. Typically: account, user & prog.

    pub fn create(ctx: Context<Create>) -> ProgramResult {
        // Set an account's counter value to 0
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        // Increment the account's counter value by 1
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
}

// Transaction instructions
#[derive(Accounts)]
pub struct Create<'info> {
    // Rust # macros are used alot when writing stuff for solana, they only apply to the next statement and typically do verif.
    // ... If any of these constraints do not hold, then the next instruction will not be executed.
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program <'info, System>,
}

// Transaction instructions
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// There is no persisted state within the program, everything is attached to what are known as accounts.
#[account]
pub struct BaseAccount {
    // Information here goes inside a transaction instruction
    pub count: u64,
}
