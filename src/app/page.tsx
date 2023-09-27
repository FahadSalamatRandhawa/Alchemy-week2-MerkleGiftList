'use client'
import { useState } from 'react'
import niceList from './utils/niceList.json'
import { merkletree } from './api/MeerkleStorage/route'

export default function Home() {
  const [name,setName]=useState<string>('')
  let niceListArray=(Object.values(niceList))

  async function getProof(_name:string){
    const index = niceListArray.findIndex(n => n === _name);
    //console.log(index)
    const proof = merkletree.getProof(index);
    //console.log(proof)
    let nameInList=await fetch('/api/getGift',{method:"POST",body:JSON.stringify({
      proof,leaf:name
    })})
    let res=await nameInList.json()
    console.log(res)
  }

  return (
   <div className=' flex items-center justify-center'>
    <div className=' w-[200px] h-[100px]'>
      <label>
        Name
      </label>
      <input onChange={(e)=>setName(e.target.value)}/>
      <button className=' h-10 w-20 bg-blue-400 rounded-sm' onClick={()=>getProof(name)} disabled={name==''} >Get gift</button>
    </div>
   </div>
  )
}
