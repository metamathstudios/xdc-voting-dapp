import Web3 from 'web3';
import VotingHubV1 from './contracts/VotingHubV1';
import { VotingHubAddress } from './constants';

export default class VotingHubWrapper {
    web3: Web3;
    chainId: number;
    account?: string;
    wrapperOptions: any;
    Contract: VotingHubV1;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new VotingHubV1(this.wrapperOptions, VotingHubAddress.Networks[chainId]);
    }

    async totalTollBurned() {
        try{
            
            const result = await this.Contract.call("totalTollBurned");
            return result;
        } catch (e) {
            throw e;
        }
    }

    async totalTollCollected() {
        try{
            const result = await this.Contract.call("totalTollCollected");
            return result;
        } catch (e) {
            throw e;
        }
    }

    async castVote(proposalId, vote, toll) {
        try{
            const result = await this.Contract.send("castVote", {from: this.account , value: toll}, proposalId, vote);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async abstainVote(proposalId, toll) {
        try{
            const result = await this.Contract.send("castVote", {from: this.account , value: toll}, proposalId);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async votingReceipt(proposalId, account) {
        try{
            const result = await this.Contract.call("receipts", account, Number(proposalId));
            return result;
        } catch (e) {
            throw e;
        }
    }

    async proposalCount() {
        try{
            const result = await this.Contract.call("proposalCount");
            return result;
        } catch (e) {
            throw e;
        }
    }

    async tollBurnPercentage() {
        try{
            const result = await this.Contract.call("TOLL_BURN_RATE");
            return result;
        } catch (e) {
            throw e;
        }
    }

    async getProposal(proposalId) {
        try{
            const result = await this.Contract.call("proposals", proposalId);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async propose(description, opensAt, closesAt, votingToll, passingPerc, uniqueHash) {
        try{
            const result = await this.Contract.send("propose", {from: this.account}, description, opensAt, closesAt, votingToll, passingPerc, uniqueHash);
            return result;
        } catch (e) {
            throw e;
        }
    }
    
}