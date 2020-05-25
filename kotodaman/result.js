const result_lists = document.getElementsByClassName("banmen");
let result_words = ["", "", "", "", "", "", ""];
document.getElementById("searchbutton").onclick = function(){
    for(let p = 0; p < result_lists.length; p++){
        if(result_lists[p].firstElementChild == null){
            //console.log(result_lists[p].firstElementChild);
            result_words[p] = "〇";
            console.log(result_words[p]);
        }
        else{
            //console.log(result_lists[p].firstElementChild);
            result_words[p] = result_lists[p].firstChild.getAttribute("alt");
            console.log(result_lists[p].firstChild.getAttribute("alt"));
        }
    }
    let result = result_words.join("");
    console.log(result);
    
}