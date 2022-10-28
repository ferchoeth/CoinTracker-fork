import React from 'react';
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getNameActivos } from "../../redux/actions/index";





function SearchBar(){
    const dispatch = useDispatch<any>();  
    
    //const[name, setName] = useState("");
    //const[minimo, setMinimo]= useState("");

    function HandleInputChange(e:any){
        e.preventDefault();
        //setName(e.target.value)
        const input = document.getElementById('minimo') as HTMLInputElement | null;
        const input_maximo = document.getElementById('maximo') as HTMLInputElement | null;
        dispatch(getNameActivos(e.target.value ,  input?.value, input_maximo?.value)) //para que busque mientras escribe
        //setName(e.target.value)
        //console.log(e.target.value)
        //console.log(name)
    }

    function HandleSumbit(e:any){
        const input = document.getElementById('minimo') as HTMLInputElement | null;
        const inputbutton= document.getElementById('button') as HTMLInputElement | null;
        const input_maximo = document.getElementById('maximo') as HTMLInputElement | null;
        dispatch(getNameActivos(inputbutton?.value,input?.value, input_maximo?.value) )
        //console.log(getNameActivos(name))
    }
   
   

  

    return(
        <div>
       <input
       type="text"
       placeholder='search active...'
       onChange={(e:any)=> HandleInputChange(e)}
       id='button'
       />

       <div>
            <button type="submit" onClick={(e:any)=> HandleSumbit(e)}>
                Search
            </button>
       </div>

       <input
       type="number"
       placeholder="since.."
       id='minimo'
       />
       <input
       type="number"
       placeholder="untill"
       id='maximo'
       />
       <div>
            <button type="submit" onClick={(e:any)=> HandleSumbit(e)}>
                Filter By
            </button>
       </div>
      
       </div>
       

       
       
    )
}

export default SearchBar;