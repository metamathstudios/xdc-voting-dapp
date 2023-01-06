import { ethers } from "ethers";
import Artifacts from "./../blockchain/contracts/VotingHubV1.json"

export function ellipseAddress(
  address: string = "",
  width: number = 4
): string {
  return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
}

export function toHHMMSS(secs) {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;
  var time = [hours, minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).join(":");
  if (time.length > 10) return
  return time
}

export function getPercentage(num, total) {
  return ((num / total) * 100).toFixed(2);
}

export function generateHexString ( length: number ): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const tmp = new Uint8Array(Math.max(~~length / 2))
    crypto.getRandomValues(tmp)
    return Array.from(tmp)
      .map((n) => ('0' + n.toString(16)).substr(-2))
      .join('')
      .substr(0, length)
  }

  // fallback to Math.getRandomValues
  let ret = ''
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2)
  }
  return ret.substring(0, length)
}

export async function fetchVotes ( _proposalId: string, _hubAddress: string, _rpcEndpoint: string, _deploymentBlock: number) {
  const provider = new ethers.providers.JsonRpcProvider(_rpcEndpoint);
    const contract = new ethers.Contract(_hubAddress, Artifacts["abi"], provider);
    const voteEventFilter = contract.filters.VoteCast(null, null, null, null);
    const votes = await contract.queryFilter(voteEventFilter, _deploymentBlock, "latest");

    const votesById = votes.reduce((acc, vote) => {
      // @ts-ignore
        const { proposalId, voter, voterChoice } = vote.args;
        if (!acc[proposalId]) {
            acc[proposalId] = [];
        }
        acc[proposalId].push({ voter, voterChoice });
        return acc;
    }, {});

    return votesById[_proposalId];
}
