// Animating scroll of scrollable containers
$('.scrollable').hover(function () {
    const scrollHeight = $(this)[0].scrollHeight
    $(this).animate({ scrollTop: scrollHeight }, { duration: 10000 })
}, function () {
    $(this).animate({ scrollTop: 0 }, { duration: 500 })
})


// Task 1 Ajax Call
$('#random-fact').html('<div class="spinner"></div>')
$.ajax({
    url: 'http://numbersapi.com/1/30/date?json',
    success: function (data) {
        $('#random-fact').html(`<p class="fs-4">${data.text}</p>`)
    },
    error: function (error) {
        $('#random-fact').html(`An error occurred while fetching data. ${error?.message}`)
    }
})
