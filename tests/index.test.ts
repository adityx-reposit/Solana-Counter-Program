import * as borsh from 'borsh'
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { connect } from "bun";
import {expect ,test} from "bun:test"
import { COUNTER_SIZE, schema } from "./types";
let adminAccount=Keypair.generate();
let dataAccount=Keypair.generate();
const programID = new PublicKey("88hHQtodzwML9jdVDoWBhGzmrgr8XhxAqxBad88xPkpX");
const connection= new Connection("https://api.devnet.solana.com","confirmed");
test('Account is initialized ', async() => { 
  
     
     const txn = await connection.requestAirdrop(adminAccount.publicKey,1*LAMPORTS_PER_SOL)
      await connection.confirmTransaction(txn);
    console.log(await connection.getAccountInfo(adminAccount.publicKey));
      // airdrop done 


    const lamports = await connection.getMinimumBalanceForRentExemption(COUNTER_SIZE);

    const ix = SystemProgram.createAccount({
      fromPubkey:adminAccount.publicKey,
      lamports,
      space:COUNTER_SIZE,
      programId:programID,
      newAccountPubkey:dataAccount.publicKey
    })

    const createAccountTransaction = new Transaction();
    createAccountTransaction.add(ix);
    const signature = await connection.sendTransaction(createAccountTransaction,[adminAccount,dataAccount]);
    await connection.confirmTransaction(signature);
    console.log(dataAccount.publicKey.toBase58());
    

    const dataAccountInformation = await connection.getAccountInfo(dataAccount.publicKey);
    const counter = borsh.deserialize(schema,dataAccountInformation?.data);
    console.log(counter.count);
    expect(counter.count).toBe(0);
    
})


