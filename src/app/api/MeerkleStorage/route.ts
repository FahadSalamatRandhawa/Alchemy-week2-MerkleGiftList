import MerkleTree from "@/app/utils/MerkleTree";
import { NextResponse } from "next/server";
import niceList from "../../utils/niceList.json";

let niceListArray = Object.values(niceList);
export let merkletree: MerkleTree = new MerkleTree(niceListArray);

export default function GET() {
  let niceListArray = Object.values(niceList);
  merkletree = new MerkleTree(niceListArray);
  return NextResponse.json("New Merkle Tree created");
}
