/**
 * Created by Administrator on 2017/10/30.
 */
$(function(){
  var pageSize = 5;
  var pageNow = 1;
 function render(){
   $.ajax({
     type:"get",
     url:" /user/queryUser",
     data:{
       page:pageNow,
       pageSize:pageSize
     },
     success:function(msg){
       var html = template("tel",msg);
       $('tbody').html(html);

       $("#pagintor").bootstrapPaginator({
         bootstrapMajorVersion:3,
         currentPage:pageNow,//当前页
         totalPages:Math.ceil(msg.total/pageSize),//总页数
         size:"small",//设置控件的大小，mini, small, normal,large
         onPageClicked:function(event, originalEvent, type,page){
           pageNow = page;
           render();
         }
       });

     }
   });

 }
  render();

  $("tbody").on("click",".btn",function(){
    $(".user_modal").modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).parent().data("isDelete");
    $(".user_btn").off().on("click",function(){

        $.ajax({
          type:"post",
          url:" /user/updateUser",
          data:{
            id:id,
            isDelete:isDelete
          },
          success:function(data){
            if(data.success){
              $(".user_modal").modal("hide");
              render();
            }

          }
        })
    })
  });

});