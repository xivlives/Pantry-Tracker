'use client'
import React, {useState} from "react";


export default function Home() {
  const [item, setItem] = useState("")
  const [type, setType] = useState("")

  const [pantryItems, setPntryItems] = useState([
    {name: ""},
    {type: ""}
  ])
  // console.log(item, type)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-sans  text-sm">
        <h1 className='text-4xl p-4 text-center font-extrabold uppercase'>Pantry Tracker</h1>
      {/* add-pantry-item form */}
        <div className="bg-red-400 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input className="col-span-3 p-3 border rounded-md placeholder-neutral-700" type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="enter item"/>
            <input className="col-span-2 px-2 py-3 mx-3 border rounded-md placeholder-neutral-700" type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="enter type"/>
            <button className="p-3 border-2 rounded-md bg-sky-700 text-white hover:bg-sky-900  active:bg-gray-400" type="submit">Add Pantry Item</button>
          </form>
        </div>
      {/* add-pantry-item form ends */}

      {/* display-pantry-item list */}
      <ul>
        {pantryItems.map((item, index) => (
          <li key={index}>
            <div>
              <span>{item.name}</span>
              <span>{item.type}</span>
            </div>
            <button>X</button>
          </li>
        ))}
      </ul>
      {/* display-pantry-item list ends */}
      
      </div>
    </main>
  );
}
