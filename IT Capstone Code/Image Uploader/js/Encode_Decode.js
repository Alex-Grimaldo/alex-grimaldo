var iEncoder = document.querySelector('#encode');
var iDecoder = document.querySelector('#decode');
var output = document.querySelector('textarea');
//new shit...

$('#formFileMultiple').on('change', function(index){  
  var arrofImages = document.querySelector("#formFileMultiple").files;
  $.each(arrofImages,function(index, currImage){
    //add it to the card
    console.log(currImage); 
    $('#imageGallery').append('<img src="data:image/jpg;base64,'+currImage+'">');
  })
})

var timerInterval;
/* my image encode attempt....
function ImagetoBase(src, callback, outputFormat){
  let image = new Image();
  image.crossOrigin='Anonymous';
  image.onload= function(){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
        ctx.drawImage(this,0,0);
      dataURL=canvas.toDataURL(outputFormat);
      callback(dataURL);
  }
}
*/

var newPhotoFile = [];
var image = new Image();

function load(){
  const canvas = document.getElementById("myCanvas");
  const context = canvas.getContext("2d");
  context.drawImage(image,0,0);
};

/*
function encodeImageFileAsURL(element){
  var file = element.files;
  reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = (e) =>{
    //newPhotoFile.push(reader.result);
    image.onload=load();
    image.src=e.target.result;
    Swal.fire({
      icon: "success",
      title: 'Image Loaded',
      text: '',
      footer: ''
    })
  }
  reader.onerror=function(){
    Swal.fire({
      title: 'Error Encoding Image. . .' ,
      html: 'I will close in <b></b> milliseconds.',
      timer: 3600,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
       //Read more about handling dismissals below
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Success Alert Closed')
      }
    })
  }
}

iEncoder.addEventListener('click', () =>{
  if(!formFile.value){
    console.log('Form File does not exist')
    output.value = window.btoa(output.value);
    if(output.value == ""){
      Swal.fire({
        title: 'Output Value is empty',
        //html: 'I will close in <b></b> milliseconds.',
        timer: 7500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            //b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        //Read more about handling dismissals below 
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('Success Alert Closed')
        }
      })
    }else{
      Swal.fire({
        title: 'Successful Encode: ' + output.value,
        html: 'I will close in <b></b> milliseconds.',
        timer: 7500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        //Read more about handling dismissals below
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('Success Alert Closed')
        }
      })
    }
  }
  //input file section
  if(formFile.value != ""){
    console.log('Form File exists')
    formFile.addEventListener('change', ()=>{
      TextArea.value = "";
      console.log(this.files);
    })
    
    encodeImageFileAsURL(formFile);
  }
});

iDecoder.addEventListener('click', ()=>{
    if(!formFile.value){
      console.log("Form File does not exist.");
      output.value = window.atob(output.value);
      Swal.fire({
          title: 'Unsuccessful Encode: ' + output.value,
          html: 'I will close in <b></b> milliseconds.',
          timer: 7500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          // Read more about handling dismissals below
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Success Alert Closed')
          }
      })
    }
    else{
      var buffer = "";
      Swal.fire({
        title: 'Image Library',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        document.createElement(formFile.value);
        console.log('inside the sweetalert');

        // Read more about isConfirmed, isDenied below
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      //take the variable holding your image files and display them
      
      
    }
  });
  */

  /* for app2.js
    Image Selector
    Goal: 
    - Clicking "View Saved Images", should pull images from the database and display them in a Sweetalert Gallery.
    - Clicking "Save Images", displays the images, after confirmation, encodes the image files received and stores them within the database.

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
  */