var currentImageIndex = 0;
var images = [];

function openModal(src, imgList) {
    images = imgList;
    currentImageIndex = images.indexOf(src);

    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var modalList = document.getElementById("imgList");

    modal.style.display = "block";
    modalImg.src = src;

    // Clear the current list
    modalList.innerHTML = '';

    // Add images to the list
    imgList.forEach(function(imgSrc) {
        var imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.onclick = function() {
            modalImg.src = imgSrc;
            currentImageIndex = images.indexOf(imgSrc);
        };
        modalList.appendChild(imgElement);
    });
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    var modalImg = document.getElementById("img01");
    modalImg.src = images[currentImageIndex];
}
