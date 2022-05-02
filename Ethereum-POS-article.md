# PROOF OF STAKE (POS)

Original article > https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/

Proof-of-Stake is a type of consensus mechanisms used by blockchain to archive distributed consensus.

It requires users to stake their ETH to become a validator in the network.

Validator -> miners like in the proof-of-work.
	- ordering transactions and creating new blocks.
	- all nodes can agree on the state of the network;

Improvements:
- better energy efficiency - you don't need to use lots of energy mining blocks;
- lower barriers to entry, reduced hardware requirements;
- stronger immunity to centralization;
- stronger support for shard chains.

## Proof-of-stake, staking, and validators
- Ethereum users will need to stake 32 EHT to become a validator;
- Validators are chosen at random to create blocks and are responsible to checking and confirming blocks thay don't create.
- A user's stake is also used as a way to incentivise good validator behavior;

## How does Ethereum's proof-of-stake work?
- validators don't need to use significant amounts of computational power because they're selected at random and aren't competing;
- they just need to create blocks when chosen and validate proposed blocks when they're not;
- Validators get rewards for proposing new blocks and for attesting to ones they've seen.
- attest to malicious blocks makes you lose stakes;


## The beacon chain
- shard chains when Ethereum replaces PoW for PoS;
- beacon chain -> extra coordination of the 64 shard chains, each with having a shared understanding of the state of network;
	- receives state information from the shards and makes it avaiable for other shards;
	- allow the network to stay in sync;
	- manage the validators from registring their stake deposits to issuing their rewards and penalties;

## How validators works
- when a transaction is submited a validator will be responsible for adding transaction to a shard block;
- validators are algorithmically chosen by the beacon chain to propose new blocks;

## Attestion
- if a validator is not chosen to propose new block, they'll have to attest to another validator's proposal and confirm that everything looks as it should.
- attestation is recorded in the beacon chain rather than the transaction itself;
- committee -> at least 128 validators are required to attest to each shard block;
- slot -> time-frame in which to propose and validate a shard block;
- only one valid block is created by slot;
- are 32 slots in an "epoch";
- After each epoch, the committee is disbanded and reformed with different random participants

## Crosslinks
- crosslink is created after new shard block proposal has enought attested;
- this confirms the inclusion of the block and your transaction in the beacon chain.
- Once there's a crosslink, the validator who proposed the block gets their reward;

## Finality
- A transaction has "finality" when it's part of a block that can't change;
- Casper -> finality protocol
	- get validators to agree on the state of a block at certain checkpoints;
	- so long 2/3 of the validators agree, the block is finalised;
	- Validators loses their entire stake if they try and revert this later on via 51% attack;

## Proof-of-stake and Security
- The threat of a 51%  still exists in proof-of-stake, but it's even more risky for the attackers;
- Need to control 51% of the staked ETH;
- There is very little incentive to destroy the value of a currency you have a majority stake in.

## Pros and Cons
Pros:
	- staking make easier to run a node;
	- Not requires huge investments in hardware or energy;
	- can join staking pools;
	- staking is more decentralized;
	- stake allows for secure sharding;
	- shard chains allows Ethereum to create multiple blocks at the same time;
	
Cons:
	- Still in its infancy;
	- less battle-tested, compared to proof-of-work;

