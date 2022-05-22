//
/* lấy phần tử modal */
var modal = document.getElementById("myModal");

/* thiết lập nút mở modal */
var btn = document.getElementById("myBtn");

/* thiết lập nút đóng modal */
var span = document.getElementsByClassName("close")[0];

/* Sẽ hiển thị modal khi người dùng click vào */
btn.onclick = function() {
    modal.style.display = "block";
}

/* Sẽ đóng modal khi nhấn dấu x */
span.onclick = function() {
    modal.style.display = "none";
}

/*Sẽ đóng modal khi nhấp ra ngoài màn hình*/
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}