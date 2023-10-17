const todaysMonth = new Date().getMonth() + 1;


function setCalendars(main){
    var months = $('.selector');
    months.css('visibility', 'hidden');
    
    $(`.CalendarContainer #${main}`).css('visibility', 'visible');
    $(`.CalendarContainer #${main}`).removeClass('side_left');
    $(`.CalendarContainer #${main}`).removeClass('side_right');
    $('.calendar').removeClass('side');
    
    
    $(`.CalendarContainer #${main + 1}`).css('visibility', 'visible');
    $(`.CalendarContainer #${main + 1} .calendar`).addClass('side');
    $(`.CalendarContainer #${main + 1}`).addClass('side_right');
    
    $(`.CalendarContainer #${main - 1}`).css('visibility', 'visible');
    $(`.CalendarContainer #${main - 1} .calendar`).addClass('side');
    $(`.CalendarContainer #${main - 1}`).addClass('side_left');
}

setCalendars(todaysMonth);

$('.day').click(function(){
    $(this).css("background-color", "#BB4F4F")
})

$('.selector').click(function(){
    console.log('HEY');

    if($(this).hasClass('side_right') || $(this).hasClass('side_left')){
        id = parseInt($(this).attr('id')) ;
        setCalendars(id);
    }
})