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

