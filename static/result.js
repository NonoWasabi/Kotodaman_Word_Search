const result_lists = document.getElementsByClassName("banmen");
let result_words = ["", "", "", "", "", "", ""];
document.getElementById("searchbutton").onclick = function(){
    for(let p = 0; p < result_lists.length; p++){
        if(result_lists[p].firstElementChild == null){
            //console.log(result_lists[p].firstElementChild);
            result_words[p] = ".";
        }
        else{
            //console.log(result_lists[p].firstElementChild);
            result_words[p] = result_lists[p].firstChild.getAttribute("alt");
        }
    }
    let result = result_words.join("");
    console.log(result);
    var fData = new FormData();
    fData.append('banmen',result);
    $.ajax({
        url: '/register',
        type: 'POST',
        data: fData,
        contentType: false,
        processData: false,
        success: function(data, dataType){
            console.log('Success',data)
            $('#result').html(data);
            resultShow();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log('Error : '+errorThrown)
        }
    });

    

}
function resultShow(){
    var result = document.getElementById('result');
    if (!result) return;
    result.classList.toggle('is-show');

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');

    resultClose(blackBg);
    resultClose(closeBtn);

    function resultClose(elem){
        if(!elem) return;
        elem.addEventListener('click', function(){
            result.classList.toggle('is-show');
        });
    }
}