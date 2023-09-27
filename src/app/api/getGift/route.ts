import { NextRequest, NextResponse } from "next/server";
import { merkletree } from "../MeerkleStorage/route";
import verifyProof from "@/app/utils/verifyProof";

export async function POST(request: NextRequest) {
  try {
    const { proof, leaf } = await request.json();
    //console.log(proof, leaf);
    const root = merkletree.getRoot();

    console.log("Before VERIFYING PROOF");
    const isInList = verifyProof(proof, leaf, root);
    console.log("AFTER VERIFYING PROOF");
    if (isInList) {
      return NextResponse.json({
        success: true,
        message: "Your gift is tricycle",
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not in list",
      });
    }
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ success: false, message: JSON.stringify(e as any) })
    );
  }
}
