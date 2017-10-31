/**
 * Created by Administrator on 2017/10/31.
 */
$(function(){
  var pageNow = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:pageNow,
        pageSize:pageSize
      },
      success:function(data){
          $("tbody").html(template("tpl",data));
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:pageNow,//当前页
          totalPages:Math.ceil(data.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            pageNow = page;
            render();
          }
        });
      }
    })
  }
  render();

  $(".add_cate").on("click",function(){
     $(".first_modal").modal("show");



  });
  $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },


    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      }
    }
  });
  var validator = $("#form").data('bootstrapValidator');

  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:" /category/addTopCategory",
      data:$form.serialize(),
      success:function(data){
        if(data.success){
          $(".first_modal").modal("hide");
          pageNow = 1;
          render();
          $form[0].reset();
          validator.resetForm();

        }
      }
    });
  });
});