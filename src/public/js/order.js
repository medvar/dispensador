elegir = (iddrink, namedrink) => {
    $('#iddrink').text = iddrink
    $('#bebida').text = namedrink
    $('#getOrder').addClass('hidden')
    $('#drinks').removeClass('hidden');
}
search = () => {
    $('#drinks').addClass('hidden')
    $('#getOrder').removeClass('hidden');
}