'use client'
import React, {useEffect, useState} from "react";
import { collection, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import dotenv from 'dotenv'
import OpenAI from "openai";
dotenv.config()




export default function pantry() {
  const [newItem, setNewItem] = useState({name: '', type: ''})
  const [pantryItems, setPantryItems] = useState([  ])
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const prompt = `Suggest recipes using these ingredients: ${pantryItems.map(item => item.name).join(", ")}`;
  console.log(recipes)

// Add item to database
  const addItem = async (e) => {
    e.preventDefault()
    if(newItem.name !== "" && newItem.type !== ""){
      // setPantryItems([...pantryItems, newItem])
      await addDoc(collection(db, 'items'),{
        name: newItem.name.trim(),
        type: newItem.type.trim()
      })
      setNewItem({name: '', type: ''})
    }
  }

// read items from database
useEffect(() => {
  const q = query(collection(db, 'items'))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let itemsArr = []
    querySnapshot.forEach((doc) => {
      itemsArr.push({...doc.data(), id: doc.id})
    })
    setPantryItems(itemsArr)
    return () => unsubscribe()
  })
}, [])

// Filter pantry items based on the search query
const filteredItems = [...pantryItems.filter(item => 
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.type.toLowerCase().includes(searchQuery.toLowerCase())
)];

// Fetch recipe suggestions from GeminiAI API
const fetchRecipes = async () => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({body: prompt})
    }).then(data => {
      setRecipes([data.text()])
    }) 
  } catch (error) { 
    console.error('Error:', error)
    setRecipes(["I'm sorry, but I encountered an error. Please try again later."])
  }
};

// delete from database
const deleteItem = async (id) => {
  await deleteDoc(doc(db, 'items', id))
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-sans  text-sm">
        <h1 className='text-4xl p-4 text-center font-extrabold uppercase'>Pantry Tracker</h1>
      {/* add-pantry-item form */}
        <div className="bg-red-400 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input className="col-span-3 p-3 border rounded-md placeholder-neutral-700" type="text" value={newItem.name} required onChange={(e) => setNewItem({...newItem, name: e.target.value})} placeholder="enter item"/>
            <input className="col-span-2 px-2 py-3 mx-3 border rounded-md placeholder-neutral-700" type="text" required value={newItem.type} onChange={(e) => setNewItem({...newItem, type: e.target.value})} placeholder="enter type"/>
            <button onClick={addItem} className="p-3 border-2 rounded-md bg-sky-700 text-white hover:bg-sky-900  active:bg-gray-400" type="submit">Add Pantry Item</button>
          </form>
        </div>
      {/* add-pantry-item form ends */}

      {/* search-pantry-item form */}
      <div className="bg-blue-400 p-4 rounded-lg mt-4">
          <input
            className="w-full p-3 border rounded-md placeholder-neutral-700 text-black text-lg font-semibold"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pantry items"
          />
        </div>
        {/* search-pantry-item form ends */}

      {/* display-pantry-item list */}
        {filteredItems.map((item, id) => (
          <li key={id} className=" pr-0 w-full bg-green-400 mt-4 px-4 flex text-2xl font-bold text-cyan-950 rounded-xl justify-between">
          <div className="p-4 w-full flex justify-between">
            <span className="capitalize">{item.name}</span>
            <span className="capitalize">type: {item.type}</span>
          </div>
        <button onClick={() => deleteItem(item.id)} className=" px-4 rounded-r-xl hover:bg-red-600">X</button>
      </li>
          
        ))}
      {/* display-pantry-item list ends */}

      {/* fetch-recipe-suggestions button */}
      <div className="bg-yellow-400 p-4 rounded-lg mt-4">
          <button
            onClick={fetchRecipes}
            className="p-3 border-2 rounded-md bg-sky-700 text-white hover:bg-sky-900 active:bg-gray-400"
          >
            Get Recipe Suggestions
          </button>
        </div>
        {/* fetch-recipe-suggestions button ends */}

        {/* display-recipe-suggestions list */}
        {recipes.length > 0 && (
          <div className="bg-purple-400 p-4 rounded-lg mt-4 w-full">
            <h2 className="text-2xl font-bold text-center">Recipe Suggestions</h2>
            <ul>
              {recipes.map((recipe, index) => (
                <div key={index} className="p-2 border-b text-black font-medium text-lg border-gray-200">{recipe}</div>
              ))}
            </ul>
          </div>
        )}
        {/* display-recipe-suggestions list ends */}
      
      </div>
    </main>
  );
}
