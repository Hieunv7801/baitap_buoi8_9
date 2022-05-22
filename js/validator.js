function Validator() {
    this.KiemTRaRong = function (value, errorId, mess) {
        if (value === "") {
            //!Error
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
    };
    this.kiemTraChucVu = function (selectId, errorId, mess) {
        if (getEle(selectId).selectedIndex !== 0) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
        //false
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };
    this.kiemTraLenghtKiTu = function (value, errorId, min, max, mess) {
        if (value.trim().length >= min && value.trim().length <= max) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
        //false
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    }
    this.kiemTraChuoiKiTu = function (value, errorId, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
        //false
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };
    this.KiemTraEmail = function(value, errorId, mess){
        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(value.match(email)){
             //true
             getEle(errorId).innerHTML = "";
             getEle(errorId).style.display = "none";
             return true;
        }
        //false
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    }
    this.KiemTraTaiKhoanTonTai = function(value, errorId, mess, arr){
        var isStartus = true;

        arr.forEach(function (item){
            if(item._taiKhoan === value){
                //tk ton tai
                isStartus =false;
            }
        });
        if (isStartus) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
          }
      
          //false
          getEle(errorId).innerHTML = mess;
          getEle(errorId).style.display = "block";
          return false;
    };
}