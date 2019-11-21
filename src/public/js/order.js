elegir = (iddrink, namedrink) => {
    $('#iddrink').val(iddrink.toString())
    $('#bebida').val(namedrink.toString())
    $('#drinks').addClass('hidden')
    $('#getOrder').removeClass('hidden');
    $('#drinks').removeClass('d-flex justify-content-center')
}
search = () => {
    $('#getOrder').addClass('hidden')
    $('#drinks').removeClass('hidden');
    $('#drinks').addClass('d-flex justify-content-center')
}
