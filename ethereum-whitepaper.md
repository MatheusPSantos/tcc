# Ethereum: A Next-Generation Smart Contract and Decentralized Application Platform.
By Vitalik Buterin (2014).

## History

- e-cash largely failed to gain traction because
of their reliance on a centralized intermediary.
- 1998 b-money became the first proposal to
introduce the idea of creating money through 
solving computational puzzles as well as 
descentralized consensus. The solution was scant on details
as to how decentralized consensus could actually be 
 implemented.
- currency is a first-to-file application:
	where the order of transactions is often
 of critical importance, decentralized currencies 
require a solution to decentralized consensus.
- **The problem with pre-Bitcoin currency protocols 
faced is, that in an anonymous setting
 such security margin are vulnerable to sybill attacks, where a single attacker creates 
thousands of simulated nodes on a server or botnet
 and uses these nodes to unilaterally secure a
 majority share.**

## Bitcoin As A State Transaction System

- From a technical standpoint, the Bitcoin ledger can be thought of as state transition system,
 where there is a "state" consisting of the ownership 
status of all existing bitcoin and a "state transitcion function" 
that takes a state and a transaction and outputs a new 
state which is the result.


## Mining

With Bitcoin we are trying to build a decentralized currency system, so we will need to combine
 the state transition system with a consensus system in order to ensure that everyone agrees on the
 order of transactions.
- bitcoin descentralized process required nodes in the network to continuously attempt to produce packages of transactions called "blocks"
- The attacker will target the one part of the bictoin that is not protected by cryptogrpahy directly.
- The attackers strategy is simple:
	- Send 100BTC to a merchant in excahnge for some product
	- wait fot the delivery of the product
	- produce another transaction sending the same 100BTC to himselft
	- Try to convince the network that his transaction to himself was the one that come first.

## Merkle tree
- left: is suffices to present only a small number of nodes in a Merkle Tree to give a proof of the validity of a branch.
- right: any attempt to change any part of the Merkle Tree will eventually lead to a inconsistency somewhere up the chain.
- An important scalability feature of Bitcoin is that the block is stored in a multi-level data structure.
- The "hash" of a block is actually only the hash of the block header.
- A Merkle tree is a type of binary tree, composed of a set of nodes with a large number of leaf nodes
	- at the bottom of the tree containing the underlying data
	- a set of intermediate nodes qhere each node is the hash of its two children
	- and a single root, also formed from the hash of its two children, representing the top of the tree.
- The purpose of the Merkle tree is to allow the data in a block to be delivered piecemeal:
	- a node can download only the header of a block from one source, the small part of the tree relevant to them from another souce,
	- the hash propagate upward: if a malicious user attempts to swap in a fake transaction into the bottom of a Merkle Tree, this change will cause a change in the node above.

### Alternative Blockchain applications
- namecoin -> descentralized name registration database.
- colored coins -> to serve as a protocol to allow people to create their own digital currencies.
- metacoins -> idea is to have a protocol that lives on top of Bitcoin, using Bitcoin transactions to store metacoin transactions but having a different state transition fuction.

### Scripting
- the Bictoin protocol actually does facilities a weak version of a concept of "smar contracts".
- UTXO (unspent transactions outputs) in Bitcoin can be owned not just by a plublic key, but also by a more complicated script expressed in a simple stack-based programming language.
- Scripting language implemented in Bitcoin has important limitations:
	- LACK OF TURING-COMPLETENESS: the main category that is missing is loops.
	- VALUE-BLINDNESS
	- LACK OF STATE: UTXO can only be used to build simple, one-off contracts and not more complex "stateful" contracts such as descentralized organizations, ans makes meta-protocols difficult to implement.
	- BLOCKCHAIN-BLINDNESS: UTXO are blind to blockchain data such as the nonce and previous hash.

- Three approaches to building advanced applications on top of cryptocurrency:
	- build a new blockchain, using scripting on top of Bitcoin, and building a meta-protocol on top of Bitcoin.
	- new blockchain -> unlimited freedom x cost of development time and bootstrapping, and meta-protocols suffer from faults in scalability.
- Ethereum -> intends to build a generalized framework that can provide the advantages of all three paradigms at the same time.

## Ethereum

**Intent** -> to merge together and improve upon the concepts of **scripting**, **altcoins** and **one-chain meta-protocols**, and allow developers to create arbitrary consensus-based applications that have the scalability, standardization, faeture-completeness, ease of development and interoperability offered by these different paradigms all at the same time.

**Does this by building** a blockchain with a built-in Turing-complete programming language, allowing anyone to write smart contracts and decentralized applications.

**Smart contracts** -> cryptographic "boxes" that contan value and only unlock it if certain conditions are met, can also be built on top of our ethereum, with more power than that offered by Bitcoin scripting because of the added powers of Turing-completeness, value-awareness, blockchain-awareness and state.

### Ethereum Accounts
- State is made up of objects called "accounts"
- each account have 20-bytes address and state transitions being direct transfers of value and information between accounts.
- contains **four fields**:
	- **nonce** -> counter to sure each transaction can only be processed once
	- **ether balance** -> account's current balance
	- **contract code** -> if present
	- **storage** -> empty by default

- **Ether** -> is internal fuel of Ethereum and is used to pay transaction fees.
- externally owned accounts -> controlled by private keys.
	- has no code
	- and one can send messaages from an externally owned account by creating and signing a transaction.
- contract accounts -> controlled by their contract code.
	- every time the contract account receives a message its code activates;
	- it allow to read and write to internal storage and send other messages or create contracts in turn.

## Messages and Transactions

- Messages are similar to "Transactions" in Bitcoin
	- differences:
		1. an Ethereum message can be created either by an external entity or a contract, whereas a Bitcoin transaction  can only be cretad by externally.
		2. there is an explicit option for Ethereum messages to contain data.
		3. If the recipient of an Ethereum message is a contract account, jas the option to return a response. This means that Ethereum messages also encompass the concept of functions.
- "transaction" -> refer to the signed data package that stores a message to be sent from an externally owned account.
	1. contains:
		- the recipient
		- signature indentifying the sender
		- the amount of ether 
		- the data to send.
		- STARTGAS -> is the limit
		- GASPRICE -> the fee to pay to the miner per computational step
- the address of the contract is calculated based on the hash of the account nonce and transaction data.
- **first class citizen** property of Ethereum -> the idea that contracts have equivalent powers to external accounts, including the ability to send message and create other contracts.

### Ethereum State Transition Function
APPLY(S,TX) -> S':

1. Check if the transaction is well-formed, the signature is valid, and the nonce matches the nonce in the sender's account. If not return an error.
2. Calculate the transaction fee as STARTGAS * GASPRICE, and determine the sender address from the signature. Subtract the fee from the sender account balance and increment the sender's nonce. If there is not enough balance to spend, return an error.
3. Initilize GAS = STARTGAS, and take off certain quantity of gas per byte to pay for the bytes in the transaction.
4. Transfer the transaction value from the sender's account to the receiving account. If the receiving account does not yet exist, create it. If the receiving account is a contract, run the contract's code either to completion or until the execution runs out of gas.
5. If the value transfer failde because the sender did not have anough money, or the execution code run out of gas, revert all state changes except the payment of the fees, and add the fees to miner's account.
6. Otherwise, refund the fees for all remaining gas to the sender, and send the fees paid for gas consumer to the miner.


### Code Execution

The code in Ethereum contracts is written in low-level, stack-based bytecode language, referred to as "Ethereum Virtual Machine Code" or "EVM code".

The conde consists in a serie of bytes where each byte represents an operation. The execution is an infinite loop.

The operations have access to three types of space in which to store data:
1. the **stack**
2. **memory**, an infinitely expandable byte array
3. The contract's long-term **storage**, a key/value store.

Stack and memory reset after the computation ends, storage persists for the long term.

Whiel the Ethereum Virtual Machine is running, its full computational state can be definde by the tuple **(block_state, transaction, message, code, memory, stack, pc, gas)**.
1. the block_state is the global state containing all accounts and includes balances and storage.

Every round of execution, the current instruction is found by taking the pc-th byte of code, and each instruction has its own definition in terms of how it affects the tuple.

## Blockchain and Mining
- The main difference between Ethereum and Bitcoin with regard to the blockchain architecture is that, unlike Bitcoin, Ethereum block contain a copy of both the transaction list and the most recent state.
- Block validation algorithm:
	1. Check if the previous block referenced exists and is valid
	2. Check that the timestamp of the block is greater than that of the referenced previous block and less than 15 minutes into the future;
	3. Check that the block number, difficulty, transaction root, uncle root and gas limit are valid;
	4. Check that the proof of work on the block is valid;
	5. Let S[0] be the STATE_ROOT of the previous block;
	6. Let TX be the block's transaction list, with n transactions. For all in 0..n-1, set S[i+1] = APPLY(S[i],TX[i]). If any applications returns an error, or if the total gas consumed in the block up until this point exceeds the GASLIMIT, return an error;
	7. Let S_FINAL be S[n], but adding the block reward paid to the miner;
	8. Check if S_FINAL is the same as the STATE_ROOT. If it is, the block is valid; otherwise, it is not valid;

- The state is stored in the tree structure;
- Cause all of the state information is part of the block, there is no need to store the entire blockchain history;


### Applications
1. financial applications
2. semi-financial applications
3. Online voting and decentralized governance

### Token Systems
- All a currency, or token system, fundamentally is a database with one operation: subtract X units from A and give X units to B, with the proviso that X had a least X units before the transaction and the transaction is approved by A. All that it takes to implement a token system is to implement this logic into a contract.

## Indentify and Reputation Systems
- dencentralized file storage
- Decentralized Autonomous Organization
	- organization that certain of members or shareholders which, perphaps with a 67% majority, have the right to spend the entity's funds and modify its code.
	- members would collectively decide on how the organization should allocate its funds.
	- The simplest design is simplu a piece of self-modifuing code that changes if two thirds of members agree on a change.
	- THe contract would then have clauses for each of these. It would maintain a record of all open storage changes, along with a list of who voted for them.
	- The differnce between DO and DAO is fuzzy, but the general dividing  line is whether the governance is generally out via a political-like process or an "automatic" process.

## Miscellanea and Concerns
1. Modified GHOST Implementation

	- Greedy Heavist Observed Sutree (GHOST) protocol. The motivation behind GHOST is that blockchain with fast confirmation times currently suffer from reduced security due to a high stale rate.
	- Blocks take a certain time to propagate through the network.
	- to solve the centralization bias, we go beyond the protocol and also allow stales to be registered into the main chain to receive a block reward.

## Fees
- Every transaction published into the blockchain imposes on the network the cost of needing to download and verify it
- regulatory mechanism involving transacton fees, to prevent abuse

## Computation and Turing-Completeness
- the Ethereum Virtual Machine is Turing-complete.
- the EVM code can encode any computation that can be can be conceivably carried out, including infinite loops.
## Issuance breakdown
### Mining centralization
- Bitcoin mining algorithm is vulnerable to two forms of centralization:
	1. The mining ecosyste has come to be dominated by ASIC's computer chips designed for, and therfore thousands of times more efficient at, the specific task of Bitcoin mining.
		- the bitcoin mining is no longer a highly decentralized and egalitarian pursuit, requiring million of dollars of capital to effectively participate.
	2. Most Bitcoin miners do not actually perform block validation locally; instead, they rely on a centralized mining pool to provide the blcok headers.
		- the miners can switch to other mining pools if a pool or coalition attempts a 51% attack.
- Ethereum intent is use a mining algorithm based on randomly generating a unique hash function for every 100 nonces, usinf a sufficiently broad range of computation to remove the benefit of specialized hardware.
- to design algoritm that mining requires access to the entire blockchain, forcing the miners to store the entire blockchain and at least be capable of verifying every transaction. Removing the need for centralization pools.

## Scalability
- Ethereum suffers from the flaw that every transaction needs to be processed by every node in the network;
- the Ethereum full nodes need to store just the state instead of the entire blockchain history;

## Puting it all together: Decentralized Applications
- the contract mechanism allows anyone to build what is essentially a command line app run on a VM that is executed by consensus across the entire network, allowing it to modify a globally accessible state as its "hard drive".
- Decentralized application -> low-level business-logic components, whether implemented entirely on Ethereum, using combination of Ethereum and other systems, or other system entirely, and high-level graphical user interface components.

# Conclusion
- The Ethereum protocol was originally conceived as an upgrade version of a cryptocurrency, provinding advanced features such as on-blockchain escrow.
- the Ethereum protocol would not support any of the applications directly, but the Turing-complete proggraming language means that arbitrary contracts can theoretically be created for any transaction type application.
- concept of an arbitrary state transition function as implemented by the Ethereum protocol provides for a platform with unique potential, rather than beuing a closed-ended, single-purpose protocol intended for a specific array of applications in data storage, gambling or finance.
- Ehtereum is Open-ended by design.
