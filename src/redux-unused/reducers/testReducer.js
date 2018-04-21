export default function reducer (state ={
  test : "",

}, action){
  if(action.type === "CHANGE_TEST"){
    return {...state, test : action.newValue};
  }

  return state
}
