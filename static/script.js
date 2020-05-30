const list_items = document.getElementsByClassName("word");
const lists = document.getElementsByClassName("empty");
const banmen_lists = document.getElementsByClassName("banmen");
const fifty_lists = document.getElementsByClassName("fifty");
const changable_lists = document.getElementsByClassName("changable");



let draggedItem = null;
let predrag = null;

for (let i = 0; i < list_items.length; i++){
    const item = list_items[i];

    item.addEventListener("dragstart", function(){
        draggedItem = item
        predrag = item.parentElement

    });

    item.addEventListener("dragend", function(){
        setTimeout( function(){
            draggedItem = null;
            predrag = null;
        }, 100);
    });

    if(item.classList.contains('changable')){
        item.addEventListener('touchstart',function(e){
            let endMode = false;
            e.preventDefault();
            draggedItem = item.cloneNode(true);
            predrag = item.parentElement;

            //touchstart -> touchmoveと判定された場合は，文字移動シーケンスと判定し，ひらがなパーツを握持する．
            item.addEventListener('touchmove',function Changable_Move(e){
                endMode = true;
                event.preventDefault();

                //タッチ中は常に指の絶対座標情報を取得する．
                var touchInfo = e.changedTouches[0];
                // タッチデバイスでひらがなパーツを握持している時，指の位置にパーツが追従するよう振舞う関数群(1)-(3)
                //(1)position fixed により，パーツがユーザデバイスの画面幅(x)，画面高さ(y)に対する絶対座標で位置指定される
                e.target.style.position = 'fixed';
                //(2)(3)(top,left)が絶対座標に該当する．touchInfoから得られる指の位置やユーザデバイスの画面サイズに応じて座標をひらがなパーツの位置を変更する．
                e.target.style.top = (touchInfo.pageY - window.pageYOffset - 50 / 2) + "px";
                e.target.style.left = (touchInfo.pageX - window.pageXOffset - 50 / 2) + "px";


            //item.removeEventListener('touchend',Changable_Move)
            });

            //touchstart -> touchendと判定されt場合は，濁点小文字変換処理を行うのが以下のeventListner
            item.addEventListener('touchend',function changable_touchend(e){
                e.preventDefault();
                if(endMode){
                    e.preventDefault();
                    // 絶対座標で指定されたスタイルをリセットする．
                    e.target.style.position = '';
                    e.target.style.top = '';
                    e.target.style.left = '';
                    //指を話した位置に最も近い要素にドロップさせる．
                    var touch = event.changedTouches[0];
                    var newParentElem = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
                    // banmenクラスを持つ7つの穴を感知した場合，appendChildによりドロップする．
                    if (newParentElem.classList.contains("banmen")) {
                        draggedItem.classList.add('input');
                        newParentElem.appendChild(draggedItem);
                    }

                }
                else{
                    window.setTimeout(function(){
                        let img_src = item.getAttribute("src");
                        img_src = img_src.substr(4);
                        img_src = img_src.slice(0, -4);
                        let dakuten_bool = item.classList.contains("dakuten");
                        let handakuten_bool = item.classList.contains("handakuten");
                        let small_bool = item.classList.contains("small");
                        if(dakuten_bool){
                            img_src = "img/"+ String((Number(img_src)+50)%100) +".svg"
                            item.setAttribute('alt','')
                            item.setAttribute("src", img_src);
                        }
                        else if(handakuten_bool){
                            img_src = "img/"+ String((Number(img_src)+50)%150) +".svg"
                            item.setAttribute("src", img_src);
                        }
                        else if(small_bool){
                            img_src = "img/"+ String((Number(img_src)+150)%300) +".svg"
                            item.setAttribute("src", img_src);
                        }
                    },100)
                }
                item.removeEventListener('touchend',changable_touchend)
            });


        });
    }

    else{
        item.addEventListener('touchstart',function(e){
            e.preventDefault();
            draggedItem = item.cloneNode(true);
            predrag = item.parentElement;
        });
        item.addEventListener('touchmove',function(e){
            event.preventDefault();
            //タッチ中は常に指の絶対座標情報を取得する．
            var touchInfo = e.changedTouches[0];
            // タッチデバイスでひらがなパーツを握持している時，指の位置にパーツが追従するよう振舞う関数群(1)-(3)
            //(1)position fixed により，パーツがユーザデバイスの画面幅(x)，画面高さ(y)に対する絶対座標で位置指定される
            e.target.style.position = 'fixed';
            //(2)(3)(top,left)が絶対座標に該当する．touchInfoから得られる指の位置やユーザデバイスの画面サイズに応じて座標をひらがなパーツの位置を変更する．
            e.target.style.top = (touchInfo.pageY - window.pageYOffset - 50 / 2) + "px";
            e.target.style.left = (touchInfo.pageX - window.pageXOffset - 50 / 2) + "px";
        });
        item.addEventListener('touchend',function(e){
            e.preventDefault();
            // 絶対座標で指定されたスタイルをリセットする．
            e.target.style.position = '';
            e.target.style.top = '';
            e.target.style.left = '';
            //指を話した位置に最も近い要素にドロップさせる．
            var touch = event.changedTouches[0];
            var newParentElem = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
            // banmenクラスを持つ7つの穴を感知した場合，appendChildによりドロップする．
            if (newParentElem.classList.contains("banmen")) {
                draggedItem.classList.add('input');
                newParentElem.appendChild(draggedItem);
            }
            setTimeout( function(){
                draggedItem = null;
                predrag = null;
            },100);
        });
    }
}

for(let j = 0; j < banmen_lists.length; j++){
    const banmen_list = banmen_lists[j];

    banmen_list.addEventListener("dragover", function(e){
        e.preventDefault();

    });
    banmen_list.addEventListener("dragenter", function(e){
        e.preventDefault();
        this.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    });

    banmen_list.addEventListener("dragleave", function(e){
        e.preventDefault();
        this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    });

    banmen_list.addEventListener("drop", function(e){
        e.preventDefault();
        this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        copy = draggedItem.cloneNode(true);
        copy.classList.add("input");
        if(this.firstElementChild != null){
            this.textContent = null;
        }
        this.append(copy);
        predrag.append(draggedItem);
    });
}



for(let m = 0; m < changable_lists.length; m++){
    const changable_list = changable_lists[m];


    changable_list.addEventListener("click", function(e){
        e.preventDefault();
        let img_src = changable_list.getAttribute("src");
        img_src = img_src.substr(4);
        img_src = img_src.slice(0, -4);

        let dakuten_bool = changable_list.classList.contains("dakuten");
        let handakuten_bool = changable_list.classList.contains("handakuten");
        let small_bool = changable_list.classList.contains("small");

        if(dakuten_bool){
            img_src = "img/"+ String((Number(img_src)+50)%100) +".svg";
            changable_list.setAttribute("src", img_src);

            if(changable_list.getAttribute("alt").normalize('NFD').length == 1){ //濁点でないとき，濁点を付けてaltを書き換える
                let after_word = unescape(escape(changable_list.getAttribute("alt").normalize("NFD")[0]) + "%u3099");
                changable_list.removeAttribute("alt");
                changable_list.setAttribute("alt", after_word);
            }
            else{ //濁点の時，濁点を外してaltを書き換える．
                let after_word = changable_list.getAttribute("alt").normalize("NFD")[0];
                changable_list.removeAttribute("alt");
                changable_list.setAttribute("alt", after_word);
            }
        }

        else if(handakuten_bool){
            let img_src_num = img_src;
            img_src = "img/"+ String((Number(img_src)+50)%150) +".svg";
            changable_list.setAttribute("src", img_src);

            if(img_src_num == 17){
                changable_list.removeAttribute("alt");
                changable_list.setAttribute("alt", "づ");
            }

            else if(img_src_num == 67){
                changable_list.removeAttribute("alt");
                changable_list.setAttribute("alt", "っ");
            }

            else if(img_src_num == 117) {
                changable_list.removeAttribute("alt");
                changable_list.setAttribute("alt", "つ");
            }

            else{
                let uni_num_x16 = escape(changable_list.getAttribute("alt").normalize("NFC")[0]).substr(2, 4);
                let uni_num = Number(parseInt(uni_num_x16, 16));

                if((uni_num % 3 == 0)||( uni_num % 3 == 1)){ 
                    uni_num++;
                    after_word = unescape("%u" + uni_num.toString(16));
                    changable_list.removeAttribute("alt");
                    changable_list.setAttribute("alt", after_word);
                }

                else{
                    uni_num = uni_num - 2;
                    after_word = unescape("%u" + uni_num.toString(16));
                    changable_list.removeAttribute("alt");
                    changable_list.setAttribute("alt", after_word);
                }
            }
        }

        else if(small_bool){
            img_src = "img/"+ String((Number(img_src)+150)%300) +".svg";
            changable_list.setAttribute("src", img_src);
            
            let uni_num = escape(changable_list.getAttribute("alt").normalize("NFD")[0]).substr(2, 4);
            if(Number(uni_num) % 2 == 0){
                let after_word = unescape("%u" + String(Number(uni_num) - 1));
                changable_list.removeAttribute("alt");
                changable_list.setAttribute("alt", after_word);
            }

            else{
                let after_word = unescape("%u" + String(Number(uni_num) + 1));
                changable_list.removeAttribute("alt");
                changable_list.setAttribute("alt", after_word);
            }


        }
    });
}

//-----------------------------------------------------------------------------------------------------------------
document.getElementById("resetbutton").onclick = function(){
    
    const reseted_Elements = document.getElementsByClassName("banmen");
    for(let n = 0; n < reseted_Elements.length; n++){
        reseted_Elements[n].textContent = null;
    }
};
