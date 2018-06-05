keyword.oninput = function(e){
    if(keyword.value){
      suggestion.classList.add('active')
    }else{
      suggestion.classList.remove('active')
    }
}