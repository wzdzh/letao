/**
 * Created by Administrator on 2017/11/2.
 */

var tools={
  getParamObj:function (){
    var obj = {};
    var search = location.search;
    search = search.slice(1);
    var arr = search.split("&");
    for(var i = 0;i < arr.length;i++){
      var key = arr[i].split("=")[0];
      var value = arr[i].split("=")[1];
      obj[key] = value;
    }
    return obj;
  },
  getParam:function(key){
    return this.getParamObj()[key];
  }
};
