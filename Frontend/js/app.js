// Animating scroll of scrollable containers
$('.scrollable').hover(function () {
    const scrollHeight = $(this)[0].scrollHeight
    $(this).animate({ scrollTop: scrollHeight }, { duration: 20000 })
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


//Uploading images

const dropzone = document.querySelector('.dropzone')
const uploadBtn = document.querySelector('#upload-btn')
const uploadStatus = document.querySelector('#upload-status')
const imageUploadBtn = document.getElementById('image-upload')

const handleDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    validateFiles(files)
}

const handleClick = () => {
    document.getElementById('image-upload').click()
}

const validateFiles = (files) => {
    uploadStatus.innerHTML = ''
    let isValid = true
    for (const file of files) {
        const fileType = file.type.split('/')[0]
        const fileSize = file.size / 1024 / 1024 // Convert bytes to MB

        if (fileType !== 'image') {
            isValid = false
            uploadStatus.innerHTML += `<p class="text-danger">Error: "${file.name}" is not an image file.</p>`
        } else if (fileSize > 2) {
            isValid = false
            uploadStatus.innerHTML += `<p class="text-danger">Error: "${file.name}" is too large (max 2MB).</p>`
        }
    }

    if (isValid) {
        uploadFiles(files)
    } else {
        console.error('Invalid files found')
    }
}

const uploadFiles = (files) => {
    uploadStatus.innerHTML = ''
    const formData = new FormData()
    for (const file of files) {
        formData.append('image', file)
    }

    $.ajax({
        url: 'http://localhost:3000/upload',
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            uploadStatus.innerHTML = '<p class="text-success fw-bold">Images uploaded successfully!</p>'
            console.log(data)
        },
        error: (err) => {
            uploadStatus.innerHTML = '<p class="text-danger fw-bold">Error uploading images!</p>'
            console.error(err)
        },
    })
}

dropzone.addEventListener('drop', handleDrop)
dropzone.addEventListener('dragover', (e) => e.preventDefault())
uploadBtn.addEventListener('click', handleClick)
imageUploadBtn.addEventListener('change', (e) => {
    const files = e.target.files
    validateFiles(files) // Call the validation function
})
