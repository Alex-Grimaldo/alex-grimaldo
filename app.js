$('#btnDarkMode').on('click', function(){
    $('#body').toggleClass('dark-mode-body');
    $('.card').toggleClass('dark-mode-cardBorder');
    $('.navbar, .hero').toggleClass('dark-mode-nav');
    $('.hero').toggleClass('dark-mode-hero');
    $('.footer').toggleClass('dark-mode-footer');
    $('.card-title').toggleClass('dark-mode-cardTitle');
    $('.card-body').toggleClass('dark-mode-cardBody');
    $('#currentProjects').toggleClass('dark-mode-container');

    var cards = $('.card-header');
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.toggle('dark-mode-cardHeader');
    }

    var cards = $('.card-body');
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.toggle('dark-mode-card');
    }

    var cards = $('.card-footer');
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.toggle('dark-mode-cardFooter');
    }
})

$('#btnContact').click(function(){
    Swal.fire({
        toast: true,
        position: 'top',
        showClass: {
            popup: `
              animate__animated
              animate__fadeInDown
              animate__faster
            `
          },
        hideClass: {
            popup: `
              animate__animated
              animate__fadeOutUp
              animate__faster
            `
        },
        showConfirmButton: false,
        timerProgressBar: true,
        html: 'Hello'
    })
})