use borsh::{BorshDeserialize,BorshSerialize}
use solana_program::{
    account_info::{next_account_info,AccountInfo},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    entrypoint
};


entrypoint!(Counter_Contract);
pub fn Counter_Contract(
    program_id:&Pubkey,
    accounts:&[AccountInfo],
    instrction_data:&[u8]

)-> ProgramResult{
    Ok(())
}