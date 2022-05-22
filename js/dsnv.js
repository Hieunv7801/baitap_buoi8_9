function DanhSachNhanVien() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    };
    this.TimViTri = function(maNV){
        var index = -1;
        this.arr.forEach(function (item,i){
            if(item._taiKhoan === maNV){
                index = i;
            }
        });
        return index;
    }
    this.xoaNV = function (maNV) {
        var index = this.TimViTri(maNV);
        if(index !== -1){
            this.arr.splice(index,1);
        }
    };
    this.suaNV = function (maNV) {
        var index = this.TimViTri(maNV);
        if(index !== -1){
            return this.arr[index];
        }
        return null;
    };
    this.capNhat = function (sv) {
        var index = this.TimViTri(sv._taiKhoan);
        if(index !== -1){
            this.arr[index] = sv;
        }
    };
    this.timKiemNV = function (keyword) {
        var mangTimKiem = [];
        this.arr.forEach(function (item){
            if(item._name.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
                mangTimKiem.push(item);
            }
        });
        return mangTimKiem;
    };
}