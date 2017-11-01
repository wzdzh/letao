/**
 * Created by Administrator on 2017/10/31.
 */
$(function(){
  var pageNow = 1;
  var pageSize = 5;
  var $form = $("form");

 function render(){
   $.ajax({
     type:"get",
     url:" /category/querySecondCategoryPaging",
     data:{
       page:pageNow,
       pageSize:pageSize
     },
     success:function(data){
       $("tbody").html(template("tpl",data));

       $("#pagintor").bootstrapPaginator({
         bootstrapMajorVersion:3,
         currentPage:pageNow,
         totalPages:Math.ceil(data.total/data.size),
         size:"small",//设置控件的大小，mini, small, normal,large
         onPageClicked:function(event, originalEvent, type,page){
           pageNow = page;
           render();
         }
       })
     }
   });

 }
  render();

  $(".add_cate").on("click",function(){
    $(".second_modal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:1000
      },
      success:function(data){
        $(".dropdown-menu").html(template("cate",data));
      }
    })
  });

  $(".dropdown-menu").on("click","a",function(){
       $(".cate_two").text($(this).text());
    $("#categoryId").val($(this).data("id"));
    $form.data('bootstrapValidator').updateStatus("categoryId", "VALID");
  });
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      //console.log(data.result);
      //  $(".img_box img").attr("src",data.result.picAddr);
      //  $("#brandLogo").val(data.result.picAddr);
      //$form.data('bootstrapValidator').updateStatus("brandLogo", "VALID");
    }
  });


  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },


    fields: {

      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          },

        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          },

        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          },

        }
      },
    }

  });
  $form.on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function(data){
        if(data.success){
          $(".second_modal").modal("hide");
          pageNow = 1;
          render();
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();
          $(".cate_two").html("请选择");
          $(".img_box img").attr("src","images/none.png")
        }
      }
    })
  });

  });