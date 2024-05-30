let boxes = document.querySelectorAll(".box");
let restbtn= document.querySelector("#res");
let newgb = document.querySelector("#newg");
let wingo = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")


let turno = true;

const winPattern =[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const resetbtn = ()=>{
    turno=true;
    enableBoxes();
    wingo.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        if(turno){//player O
            box.innerText="O";
            turno=false;

        }else{//player x
            box.innerText="X";
            turno=true;
        }
        box.disabled=true;
        checkwinner();
    });
});
const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    wingo.classList.remove("hide");
    disableBoxes();
};
const checkwinner = () =>{
    for(let pattern of winPattern){
      let pat1 = boxes[pattern[0]].innerText;
      let pat2 = boxes[pattern[1]].innerText;
      let pat3 = boxes[pattern[2]].innerText;

     if(pat1 !=""&& pat2 !=""&& pat3 !="") {
        if(pat1===pat2 && pat2===pat3){
            console.log("winner",pat1);
            showWinner(pat1);
        }
     }
    }
};
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

restbtn.addEventListener("click",resetbtn);
newgb.addEventListener("click",resetbtn);