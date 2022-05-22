function NhanVien(_taiKhoan, _name, _email, _password, _ngaylam, _luongCB, _chucvu, _gioLam) {
    this._taiKhoan = _taiKhoan;
    this._name = _name;
    this._email = _email;
    this._password = _password;
    this._ngaylam = _ngaylam;
    this._luongCB = _luongCB;
    this._chucvu = _chucvu;
    this._gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";
    this.LuongTB = function () {
        switch (_chucvu) {
            case 'sep':
                this.tongLuong = this._luongCB * 3;
                break;
            case 'truongphong':
                this.tongLuong = this._luongCB * 2;
                break;
            case 'sep':
                this.tongLuong = this._luongCB * 1;
                break;
            default:
                break;
        }
    }
    this.xepLoai = function () {
        if (this._gioLam >= 192) {
            this.xepLoai = "Xuất sắc";
        } else if (this._gioLam >= 176) {
            this.xepLoai = "Giỏi";
        } else if (this._gioLam >= 160) {
            this.xepLoai =  "Khá";
        } else {
            this.xepLoai = "Trung Binh";
        }
    }
}