var dsnv = new DanhSachNhanVien();
var validator = new Validator();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}
function layThongTinNV(isAdd) {
    var _taiKhoan = getEle("tknv").value;
    var _name = getEle("name").value;
    var _email = getEle("email").value;
    var _password = getEle("password").value;
    var _ngaylam = getEle("ngaylam").value;
    var _luongCB = getEle("luongCB").value;
    var _chucvu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    //* flag(cờ) - isValid là true hợp lệ/ false: k hợp lệ
    var isValid = true;

    //! Check Validator
    if(isAdd){
    //Ma NV
    isValid &= validator.KiemTRaRong(_taiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
        validator.kiemTraLenghtKiTu(_taiKhoan, "tbTKNV", 3, 7, "(*) Vui lòng nhập 3-7 kí tự") && 
        validator.KiemTraTaiKhoanTonTai(_taiKhoan, "tbTKNV", "(*) Tài khoản đã tồn tại", dsnv.arr);
    }
    // Ten Nv
    isValid &= validator.KiemTRaRong(_name, "tbTen", "(*) Vui lòng nhập tên") &&
        validator.kiemTraChuoiKiTu(_name, "tbTen", "(*) Sai định dạng tên");
    // Email NV
    isValid &= validator.KiemTRaRong(_email, "tbEmail", "(*) Vui lòng nhập Email")&&
    validator.KiemTraEmail(_email, "tbEmail", "(*) Email sai định dạng");
    // Pass NV
    isValid &= validator.KiemTRaRong(_password, "tbMatKhau", "(*) Bạn chưa nhập mật khẩu");
    //Ngày Lam
    isValid &= validator.KiemTRaRong(_ngaylam, "tbNgay", "(*) Vui lòng nhập ngày làm");
    //Lương
    isValid &= validator.KiemTRaRong(_luongCB, "tbLuongCB", "(*) Vui lòng nhập lương");
    //Giờ làm
    isValid &= validator.KiemTRaRong(_gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm");
    //Chưc vụ
    isValid &= validator.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ");
    //check isValid
    if (!isValid) return;

    var nhanVien = new NhanVien(_taiKhoan, _name, _email, _password, _ngaylam, _luongCB, _chucvu, _gioLam);
    //tổng lương 
    nhanVien.LuongTB();
    // xếp loại
    nhanVien.xepLoai();

    return nhanVien;
}
getEle("btnThem").onclick = function () {
    getEle("tknv").disabled = false;
    getEle('btnThemNV').style.display = "inline-block";
    getEle("name").value = "";
    getEle("tknv").value = "";
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("ngaylam").value = "";
    getEle("luongCB").value = "";
    getEle("chucvu").value = "";
    getEle("gioLam").value = "";
}
getEle("btnThemNV").onclick = function () {
    var nhanVien = layThongTinNV();
    if (nhanVien) {
        dsnv.themNV(nhanVien);
        taoBang(dsnv.arr);
        setLocalStorage();
        getEle("name").value = "";
        getEle("tknv").value = "";
        getEle("name").value = "";
        getEle("email").value = "";
        getEle("password").value = "";
        getEle("ngaylam").value = "";
        getEle("luongCB").value = "";
        getEle("chucvu").value = "";
        getEle("gioLam").value = "";
    }
}
function taoBang(data) {
    var content = "";
    data.forEach(function (item) {
        content += `
        <tr>
        <td>${item._taiKhoan}</td>
        <td>${item._name}</td>
        <td>${item._email}</td>
        <td>${item._ngaylam}</td>
        <td>${item._chucvu}</td>
        <td>${item.tongLuong}</td>
        <td>${item.xepLoai}</td>
        <td>
            <button class="btn btn-info mb-2" data-toggle="modal"
            data-target="#myModal" onclick="suaNV('${item._taiKhoan}');">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNV('${item._taiKhoan}');">Xóa</button>
        </td>
    </tr>
        `;
    });
    getEle("tableDanhSach").innerHTML = content;
}
/**
 * Xóa SV
 * 
 */
function xoaNV(id) {
    dsnv.xoaNV(id);
    taoBang(dsnv.arr);
    setLocalStorage();
}
/**
 * Sửa SV
 * 
 */
function suaNV(id) {
    var nv = dsnv.suaNV(id);
    if (nv) {
        //* Dom tới thẻ input show value
        getEle("tknv").value = nv._taiKhoan;
        getEle("name").value = nv._name;
        getEle("email").value = nv._email;
        getEle("password").value = nv._password;
        getEle("ngaylam").value = nv._ngaylam;
        getEle("luongCB").value = nv._luongCB;
        getEle("chucvu").value = nv._chucvu;
        getEle("gioLam").value = nv._gioLam;
        //? Hiển thị button cập nhật 
        getEle('btnCapNhat').style.display = "inline-block";
        getEle('btnThemNV').style.display = "none";
        //? Disable input#txtMaSV
        getEle("tknv").disabled = true;
    }
}
/**
 * Cập nhật sinh viên
 */
getEle("btnCapNhat").onclick = function () {
    var nhanVien = layThongTinNV();
    dsnv.capNhat(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
}
/**
 *  Tìm sinh viên
 */
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    taoBang(mangTimKiem);
});
function setLocalStorage() {
    //Convert from JSON to String
    var dataString = JSON.stringify(dsnv.arr);
    //luu xuong localStorage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //Convert from String to JSON
        var dataJson = JSON.parse(dataString);
        dsnv.arr = dataJson;
        taoBang(dsnv.arr);
    }
}