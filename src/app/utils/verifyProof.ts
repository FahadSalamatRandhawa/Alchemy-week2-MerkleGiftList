import { keccak256 } from "ethereum-cryptography/keccak";
import { bytesToHex, hexToBytes } from "ethereum-cryptography/utils";

const concat = (left: Uint8Array, right: Uint8Array) =>
  keccak256(Buffer.concat([left, right]));

function verifyProof(proof: any[], leaf: any, root: string) {
  console.log("Inside Verify Proof");
  proof = proof.map(({ data, left }) => ({
    left,
    data: hexToBytes(data),
  }));
  let data = keccak256(Buffer.from(leaf));
  console.log("leaf", data);

  for (let i = 0; i < proof.length; i++) {
    if (proof[i].left) {
      data = concat(proof[i].data, data);
    } else {
      data = concat(data, proof[i].data);
    }
  }

  return bytesToHex(data) === root;
}

export default verifyProof;
