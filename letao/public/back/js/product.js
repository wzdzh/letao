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
       url:"/product/queryProductDetailList",
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
     })

   };

  $(".add_cate").on("click",function(){
      $(".goods_modal").modal("show");
      $.ajax({
         type:'get',
         url:"/category/querySecondCategoryPaging",
         data:{
           page:pageNow,
           pageSize:1000
         },
         success:function(data){
           console.log(data);
           $(".dropdown-menu").html(template("cate",data));
         }
      })
  });

  render();

  $(".dropdown-menu").on("click","a",function(){
      $(".cate_two").html($(this).html());
      $("#brandId").val($(this).data("id"));
      $form.data('bootstrapValidator').updateStatus("brandId");
  });

 $("#fileupload").fileupload({
   datatype:"json",
   done: function (e, data) {
     console.log(data.result);
     $(".img_box img").attr("src",data.result.picAddr);
     $("#brandLogo").val(data.result.picAddr);
     $form.data('bootstrapValidator').updateStatus("brandLogo", "VALID");
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

      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级级分类'
          },

        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          },

        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          },

        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '您的库存必须大于零'
          }

        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺寸'
          },
          regexp: {
            regexp: /^3[0-9]-[3-5][0-5]$/,
            message: '请输入正确的尺码(30-50)'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          },

        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品折扣价'
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

});
