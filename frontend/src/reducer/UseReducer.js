export const initialState=null;
export const reducer=(state,action)=>{
    if(action.type=="USER"){
        return action.payload
    }
   else if(action.type=="clear"){
        return null
    }
    else{
        return state
    }
    
}