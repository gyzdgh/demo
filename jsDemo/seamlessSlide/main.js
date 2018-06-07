//优化前

// $('.images > img:nth-child(1)').addClass('current')
// $('.images > img:nth-child(2)').addClass('enter')
// $('.images > img:nth-child(3)').addClass('enter')

// let n = 1
// setInterval(()=>{
//     $(`.images > img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
//         .one('transitionend',(e)=>{
//             $(e.currentTarget).removeClass('leave').addClass('enter')
//         })
//         $(`.images > img:nth-child(${x(n+1)})`).removeClass('enter').addClass('current')
//         n += 1
// },3000)

// function x(n){
//     if(n>3){
//         n = n%3
//         if(n ===0){
//             n=3
//         }
//     }
//     return n
// }




// 优化后

let n 
w()
setInterval(()=>{
    makeLeave(getImage(n))
        .one('transitionend',(e)=>{
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n+1))
    n += 1
},3000)




function getImage(n){
    return $(`.images > img:nth-child(${x(n)})`)
}

function x(n){
    if(n>3){
        n = n%3
        if(n === 0){
            n = 3
        }
    }
    return n
}

function w(){
    n = 1
  $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function makeCurrent($node){
    return $node.removeClass('enter leave').addClass('current')
  }
  function makeLeave($node){
    return $node.removeClass('enter current').addClass('leave')
    return $node
  }
  function makeEnter($node){
    return $node.removeClass('current leave').addClass('enter')
  }

