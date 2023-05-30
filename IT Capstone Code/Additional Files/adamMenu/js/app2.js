$('#theme').click(function(){
    var element = document.getElementById("body");
    element.classList.toggle("dark-mode-body");
    var cards = document.getElementsByClassName("darkToggle");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle("dark-mode-cardHeader");
    }
    var card = document.getElementsByClassName("card-body");
    for (let i = 0; i < card.length; i++) {
        card[i].classList.toggle("dark-mode-cardBody");
    }
    var profile = document.getElementById("profile");
    profile.classList.toggle("dark-mode-profile");
})

$('#confirmColor').click(function(){
    var bgColor = document.getElementById("backgroundColorPicker").value;
    document.body.style.backgroundColor = bgColor;
})

$('#formFileSingle').click(function(){
    const frame = document.getElementById('content');
    const file = document.getElementById('formFileSingle');
    file.addEventListener('change', function() {
        // access the uploaded image file and generate URL
        const image = file.files[0];
        const bgUrl = window.webkitURL.createObjectURL(image);
        // set background image of frame
        frame.style.background = `url(${bgUrl})`;
    });
})

$('#saveChanges').click(function(){
    Swal.fire({
        toast: true,
        backdrop: false,
        /* showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
            icon: ''                       // disable icon animation
        }, */
        position: 'top-end',
        icon: 'question',
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#198754',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire({
                toast: true,
                backdrop: false,
                position: 'top-end',
                icon: 'success',
                title: 'Changes Saved',
                showConfirmButton: false,
                timer: 1500
              })
        } else if (result.isDenied) {
            Swal.fire({
                toast: true,
                backdrop: false,
                position: 'top-end',
                title: 'Nothing Saved',
                showConfirmButton: false,
                timer: 1500
              })
        }
      })
})

$('#homepage').click(function(){
    Swal.fire({
        backdrop: false,
        position: 'top',
        title: 'Be sure you save all changes!',
        showDenyButton: true,
        confirmButtonText: 'Go to Homepage',
        confirmButtonColor: '#198754',
        denyButtonText: `Cancel`,
        hideClass: {
            popup: 'animate__animated animate__backOutUp'
        }
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = 'homepage.html';
        } else if (result.isDenied) {
            
        }
    })
})

$('#logout').click(function(){
    Swal.fire({
        backdrop: false,
        position: 'top',
        title: 'Are you sure you want to logout?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#198754',
        denyButtonText: `No`,
        hideClass: {
            popup: 'animate__animated animate__backOutUp'
        }
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = 'login.html';
        } else if (result.isDenied) {
            
        }
      })
})

$("#fullScreen").click(function(){
    var elem = document.getElementById("menu");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
})

$("#viewImages").click(function(){
    $.each(newFiles,function(index,objCurrentImage){
        //add it to a card with id of 'imagebody'
        let strHTML = '';
        strHTML += '<label>';
        strHTML += '<img class= "viewImg scrImg close mb-2 mr-1 mt-2" id="scrImg" src=' + objCurrentImage + ' /> ';
        strHTML += '<button class="col-7 btn btn-danger mb-2 mx-auto remove" onclick="return this.parentNode.remove();" id="deleteImage">Delete</button>'
        strHTML += '</label>';
        $('#imagebody').append(strHTML);
    })
    $('#divImages').removeClass('d-none');
})

var cardImages = [];
var ScrnSvrImage = [];
var arrImages = [];
var srcValue;
var mysrc;
var imgElement;
$("#saveImages").click(function(){
    imgElement = $('.viewImg');

    arrImages = $('.viewImg').map(function(){
        return this.currentSrc;
    })
    console.log(arrImages);
    $.each(newFiles,function(index,objCurrentImage){
        //add it to a card with id of 'imagebody2'
        let strHTML = '';
        strHTML += '<label>';
        strHTML += '<img class= "viewImg close mb-2 mr-1 mt-2" id="scrImg2" src=' + objCurrentImage + ' /> ';
        strHTML += '<button class="col-7 btn btn-danger mb-2 mx-auto remove" onclick="return this.parentNode.remove();" id="deleteImage2">Delete</button>'
        strHTML += '</label>';
        $('#imagebody2').append(strHTML);
    })
    emptyArray();
})

$('#uploadImages').click(function(){
    imgElement = $('.viewImg');

    arrImages = $('.viewImg').map(function(){
        return this.currentSrc;
    })
    Swal.fire({
        icon: 'success',
        html: "Pictures uploaded"
    });
})


function emptyArray(){
    newFiles.length = 0;
    const div = document.getElementById('imagebody'); // replace 'yourDivId' with the ID of your div
    const labels = div.getElementsByTagName('label');
    while (labels[0]) {
    labels[0].parentNode.removeChild(labels[0]);
    }
}


$("#deleteImage").click(function(){
    var arr = newFiles;
    var val = $(this).closest('img').find("src").text();
    console.log(val);
    var index = arr.findIndex(function(item) {return item.src == val})
    console.log(index);
    arr.splice(index, 1);
    console.log(arr);
})

function showButton(){
    if(document.getElementById("formFileSingle").value == "") {
        document.getElementById("setBackground").style.visibility='visible';
    } else {
        document.getElementById("setBackground").style.visibility='hidden';
    }
}

jQuery(document).ready(function(columnFlip) {
    var alterClass = function(){
        var ww = document.body.clientWidth;
        if (ww < 820) {
            flip();
        } else if (ww >= 821) {
            flipAgain();
        }
    };
    $(window).resize(function(){
        alterClass();
    });
});

/* Time Input */
$('#ssStart').click(function(){

})

/* Time Input */
$('#ssEnd').click(function(){
    
})

$('#ssViewStart').click(function(){

})

$('#ssViewEnd').click(function(){
    
})

/* Save Time Inputs */
var arrSStime;
$('#ssSaveTimes').click(function(){
    const timeStart = document.getElementById('ssStart').value;
    const timeEnd = document.getElementById('ssEnd').value;
    console.log(timeStart);
    console.log(timeEnd);
    arrSStime = $('.sstime').map(function(){
        return this.value;
    })
})

var preview;
function previewFile() {
    preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var imgPreview = document.getElementById('imgPreview');
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      console.log(reader.result);
    }
  
    if (file) {
      reader.readAsDataURL(file);
      imgPreview.classList.add('animate__animated', 'animate__fadeIn');
    } else {
      preview.src = "";
    }
}

$('#setBackground').click(function(){
    arrImages.push(preview.src);
    console.log(arrImages);
})

let current = "";
function flip(){
    if(current ='one'){
        $('#one').appendTo('#main');
        current = 'two';
    }
}
function flipAgain(){
    if(current ='two'){
        $('#two').appendTo('#main');
        current = 'one';
    }
} 

/* Functions for login, createAccount, and Homepage */

$('#login').click(function(){
    window.location.href='homepage.html';
})

$('#createAccount').click(function(){
    window.location.href='createAccount.html';
})

$('#accountCreated').click(function(){
    window.location.href='login.html';
})

$('#returnLogin').click(function(){
    window.location.href='login.html';
})

$('#login').click(function(){
    window.location.href='homepage.html';
})

$('#toMenu').click(function(){
    window.location.href='menuBuilder.html';
})

$('#toOrderReady').click(function(){
    window.location.href='menuBuilder.html';
})


/*
    Image Selector
    Goal: 
    - Clicking "View Saved Images", should pull images from the database and display them in a Sweetalert Gallery.
    - Clicking "Save Images", displays the images, after confirmation, encodes the image files received and stores them within the database.
 */
var view = document.querySelector('#viewImages');
var currentGallery = []; //connect this array to the base64 images in the database
view.addEventListener('click',function(index){
    // display each image.
    $.each(currentGallery,function(index, currImage){
        //add it to the card
        console.log(currImage); 
        $('#imageGallery').append('<img src="data:image/jpg;base64,'+currImage+'">');
      })
})


//encoding to base64 and pushing to array
var newFiles = [];
function encodeImageFileAsURL(element) {
    var files = document.querySelector('#formFileMultiple').files;
    console.log(files);
    $.each(files,function(index,file){
        console.log(file); 
        var strShareFile;
        getBase64(file).then((data) => {
            newFiles.push(data);
        });
    })
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    ;}
} 

//console.log(newFiles);

//http methods for Image Storage Solution

//HTTP Read, display images currently stored.
$("#viewImages").on("click",function(){
       
    $.getJSON("http://localhost/API/APIMenuEditor.php", {function:'getImages'}, function(result){
        $.each(result,(i,photo)=>{

        })
    })
})

$("#saveImages").on("click",function(result){
    $.getJSON("http://localhost/API/APIMenuEditor.php", {function:'addImage'}, function(result){
        console.log("here"); 
        console.log(newFiles);
        $.each(result,(i,photo)=>{
            
        })
    })
    //'http://localhost:7071/api/swollenCoffee?function=membership&Email=' +$('#txtNewEmail').val()+'&FirstName='+$('#txtNewFirstName').val()+'&LastName='+$('#txtLastName').val()+'&PreferredLocation='+$('#cboNewPreferredLocation').val()+'&Password='+$('#txtNewPassword').val()+'&Address1='+$('#txtAddress1').val()+'&Address2='+$('#txtAddress2').val()+'&City='+$('#txtCity').val()+'&State='+$('#txtState').val()+'&ZIP='+$('#txtZIP').val()+'&PhoneNumber='+$('#txtPhoneNumber').val()+'&DOB='+$('#txtDateOfBirth').val()
    $.post('http://localhost/API/APIMenuEditor?function=addImage&imageList='+newFiles,function(result){
        let objResult = JSON.parse(result);
        console.log(objResult);

    })
})

$('#slideshow').click(function(){
 // Set up the slideshow
var index = 0;
var slideshowInterval;

function startSlideShow() {
    // Enter full-screen mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  
    slideshowInterval = setInterval(slideShow, 5000);
  }
  

function stopSlideShow() {
  clearInterval(slideshowInterval);
}

function slideShow() {
    // Set the width and height of the content div to the width and height of the screen
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    $("#content").width(screenWidth).height(screenHeight);
  
    // Launch the slideshow in full-screen mode
    var elem = document.getElementById("content");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  
    $("#content").removeAttr("style");
    $("#content").css({
      "background-color": "black",
      "background-repeat": "no-repeat",
      "cursor": "none",
      "z-index": "9999",
      "position": "absolute",
      "top": "0",
      "bottom": "0",
      "left": "0",
      "right": "0"
    });
    $("#content").html("");
    if (index == arrImages.length) {
      index = 0;
    }
    $("#content").css('background-image', 'url(' + arrImages[index] + ')');
    index++;
  }
  

// Set up the escape key listener
var escapePressed = false;

$(document).keyup(function(e) {
  if (e.key === "Escape") {
    escapePressed = true;
    stopSlideShow();
    $("#content").hide();
  } else {
    escapePressed = false;
  }
});

// Create the content div and add it to the body
const contentDiv = $("<div>").attr("id", "content").appendTo("body");

// Set up the screen saver
function applyScreenSaver() {
  if (!escapePressed) {
    const date = new Date();
    let hour = date.getHours();
    let day = date.getDay();
    if (day === 0) {
        // Show a black screen on day 0
        stopSlideShow();
        $("#content").css("background-color", "black");
        contentDiv.show();
        //startSlideShow();
      }else if (day >= 1 && day <= 6 && (hour < 7 || hour >= 18)) {
        // Show a black screen before 7 and after 18 on day 1 through 6
        stopSlideShow();
        $("#content").css("background-color", "black");
        contentDiv.show();
      }else {
        // Show the slideshow during other times
        startSlideShow();
        contentDiv.show();
      }
  }
}

// Call applyScreenSaver every 5 seconds
applyScreenSaver();
})
