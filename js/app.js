// Animating scroll of scrollable containers
$(document).ready(function () {
    $('.scrollable').hover(function () {
        var scrollHeight = $(this)[0].scrollHeight
        $(this).animate({
            scrollTop: scrollHeight
        }, { duration: 10000 })
    }, function () {
        $(this).animate({
            scrollTop: 0
        }, { duration: 500 })
    })
})
