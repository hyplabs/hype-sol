use anchor_lang::prelude::*;
declare_id!("3nX4evzuDS1hg8Z3P2N8nw6jAA2yndosgPzCa8YNGB9T");

#[program]
pub mod hype_solana_notepad {
    use super::*;

    pub fn write_note(ctx: Context<WriteNote>, topic: String, content: String) -> Result<()> {
        let note: &mut Account<Note> = &mut ctx.accounts.note;
        let author: &Signer = &ctx.accounts.author;
        // for the timestamp
        let clock: Clock = Clock::get().unwrap(); // note that unwrap panics on error

        // validate inputs
        if topic.chars().count() > 50 {
            return Err(ErrorCode::TopicTooLong.into());
        }

        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        note.author = *author.key;
        note.timestamp = clock.unix_timestamp;
        note.topic = topic;
        note.content = content;

        Ok(())
    }
}

// Since programs are stateless, this is the context that
// the program needs (i.e. the data a.k.a accounts) to run
// properly. It's kind of like middleware that runs before
// each txn and provides the results through the ctx struct
#[derive(Accounts)]
pub struct WriteNote<'info> {
    // this is an account constraint, it's a macro that
    // helps us initialize an account with the right amount of
    // memory
    #[account(init, payer = author, space = Note::LEN)]
    pub note: Account<'info, Note>,
    // the payer for an account init must be mutable
    // since we are mutating the amount of money in their account
    #[account(mut)]
    pub author: Signer<'info>,
    // this constraint ensures that the real system program
    // is passed in and not another, possibly malicious program
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Note {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
// set max topic size of 50 characters
// UTF-8 char is 1-4 bytes - take 4 since it's the max
// 5- x 4 = max 200 bytes
const MAX_TOPIC_LENGTH: usize = 50 * 4;
// there's also a string prefix that stores length of the string
const STRING_LENGTH_PREFIX: usize = 4;
// set max content size to 280 characters
const MAX_CONTENT_LENGTH: usize = 280 * 4;

impl Note {
    // This is how much data we want to allocate (in bytes) for a note
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author
        + TIMESTAMP_LENGTH // Timestamp
        + STRING_LENGTH_PREFIX // Topic
        + MAX_TOPIC_LENGTH // Topic
        + STRING_LENGTH_PREFIX // Content
        + MAX_CONTENT_LENGTH; // Content
}

// custom solana error codes using anchor's error_code macro
#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
