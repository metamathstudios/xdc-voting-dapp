import Contract from "./Contract";
import Artifacts from "./VotingHubV1.json";

class VotingHubV1 extends Contract {
  constructor(options, address) {
    super(options, "VotingHubV1", Artifacts["abi"], address);
  }
}

export default VotingHubV1;