# Consensus Mechanisms

- Network's nodes must reach an agreement on the network's current state. This aggrement is achieved using consensus mechanisms.
- A general agreement is reached.
- Reaching consensus means that a least 51% of the nodes on the network agree on the next global state of network.

## What is a consensus mechanisms?
- Consensus mechanisms allow distributed systems to work together and stay secure.
- A Consensus mechanisms in a cryptoeconomic system:
	- helps prevent certain kinds of economic attacks.
	- make the "51% attack" unfeable.

## Types of Consensus Mechanisms

### Proof-of-work
Consensus protocol of the Ethereum and Bitcoin.

#### Block creation
- Proof-of-work is done by miners, who compete to create new blocks full of processed transactions.
- The winner shares the block to the rest of the network and earns some freshy minted ETH.
- Solve the puzzle is the work in "Proof-of-work".

#### Security
- is nedeed 51% of the network's computing power to defraud the chain.

### Proof-of-stake
#### Block creation
- Proof-of-stake is done by validators who have staked ETH to participate in the system.
- A validator is chosen at random to create new blocks, share with the network and earn rewards.
- Is needed only staked ETH in the network.
- Needs 51% of total staked ETH to defraud the chain.


## Sybil resistance & chain selection
- PoW and PoS are not consensus protocol by themselves.
- Are Sybil resistance mechanisms and block author selectors.
- They are way to decide who is the author of the latest block.
- The Sybil resistance mechanism combined with a chain selection rule that makes up a true consensus mechanism.
- **Sybil resistance** -> measures how a protocol fares against a Sybil attack.
	- Sybil attack are when one user or group pretends to be many users.
- **Chain selection rule** -> used to decide which chain is the "correct" chain.
	- "longest chain" rule is used by Bitcoin and Ethereum.
	- PoW + longest chain rule = Nakamoto Consensus.