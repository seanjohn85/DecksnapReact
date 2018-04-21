export default function reducer (state ={
  userName : "",
  userId: ""
}, action){
  if(action.type === "CHANGE_USERNAME"){
    return {...state, userName : action.val};
  }
  if(action.type === "CHANGE_ID"){
    return {...state, userId: action.val};
  }
  return state
}
