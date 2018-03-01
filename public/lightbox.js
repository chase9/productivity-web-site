// Lightbox Scripts
var lightbox = document.getElementById('lightbox');
var close = document.getElementById('close');
var images = document.getElementsByClassName('flex-img');
var lightboxImg = document.getElementById('lightbox-image');
var lightboxThumbBox = document.getElementById('lightbox-thumbs');
var playButton = document.getElementById('play');

var slideshow = false;

for (var i = 0; i < images.length; i++) {
    images[i].onclick = function () {
        lightbox.style.visibility = "visible";
        lightbox.style.opacity = '1';
        lightboxImg.src = this.src;
    };

    lightboxThumbBox.innerHTML += "<img class='lightbox-thumb' src='" + images[i].src + "'>";

    var lightBoxThumbs = document.getElementsByClassName('lightbox-thumb');
    for (var j = 0; j < lightBoxThumbs.length; j++) {
        lightBoxThumbs[j].onclick = function () {
            lightbox.style.visibility = "visible";
            lightbox.style.opacity = '1';
            lightboxImg.src = this.src;
        };
    }
}

// Hide lightbox on 'esc' or pressing close icon.
document.addEventListener("keypress", function (ev) {
    if (ev.keyCode === 27) {
        lightbox.style.visibility = "hidden";
        lightbox.style.opacity = '0';
    } else if (ev.keyCode === 37) {
        previous();
    } else if (ev.keyCode === 39) {
        next();
    }
});

close.onclick = function () {
    lightbox.style.visibility = "hidden";
    lightbox.style.opacity = '0';
};

function getCurrentIndex() {
    for (var i = 0; i < images.length; i++) {
        if (images[i].src === lightboxImg.src) {
            return i;
        }
    }
}

function previous() {
    var currIndex = getCurrentIndex();
    lightboxImg.style.opacity = '0';
    setTimeout(function () {
        if (currIndex === 0) {
            lightboxImg.src = images[images.length - 1].src;
        } else {
            lightboxImg.src = images[getCurrentIndex() - 1].src;
        }
    }, 200);
    setTimeout(function () {
        lightboxImg.style.opacity = '1';
    }, 200);
}

function next() {
    var currIndex = getCurrentIndex();
    lightboxImg.style.opacity = '0';
    setTimeout(function () {
        if (currIndex === images.length - 1) {
            lightboxImg.src = images[0].src;
        } else {
            lightboxImg.src = images[currIndex + 1].src;
        }
    }, 200);
    setTimeout(function () {
        lightboxImg.style.opacity = '1';
    }, 200);
}

var interval;

function toggleSlideshow() {
    if (playButton.innerText === "Play") {
        playButton.innerText = 'Pause';
        slideshow = true;
    } else {
        playButton.innerText = 'Play';
        slideshow = false
    }
    console.log(slideshow);
    if (slideshow) {
        playSlideshow()
    } else {
        clearTimeout(interval)
    }
}

function playSlideshow() {
    next();
    interval = setTimeout(playSlideshow, 3000);
}