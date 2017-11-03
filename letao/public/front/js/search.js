/**
 * Created by Administrator on 2017/11/1.
 */
$(function(){
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
  });

  function getHistory(){
    var search_history = localStorage.getItem("lt_history_search") || "[]";
    var arr = JSON.parse(search_history);
    return arr;
  }
  function render(){
    var arr = getHistory();
    $(".history").html(template("tpl",{arr:arr}));
  }

  render();
  $(".history").on("click",".empty_his",function(){
    console.log(11);
    localStorage.removeItem("lt_history_search");
    render();
  });

  $(".history").on("click",".fa-close",function(){
        var index = $(this).data("index");
        var arr = getHistory();
        arr.splice(index,1);
       localStorage.setItem("lt_history_search",JSON.stringify(arr));
       render();
  });
  $(".search_btn").on("click",function(){
      var key = $(".search_text").val().trim();
    if(key == ""){
      return;
    }
      var arr = getHistory();
      var index = arr.indexOf(key);
      if(index > -1){
        arr.splice(index,1);
      }
      if(arr.length >= 10){
        arr.pop();
      }
      arr.unshift(key);
      localStorage.setItem("lt_history_search",JSON.stringify(arr));

    location.href = "searchList.html?key="+key;
  })
});