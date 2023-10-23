
$(document).ready(setTimeout(function(){
    console.log(testr);
    const todaysMonth = new Date().getMonth() + 1;
    
    
    var markdays = {0:[], 1:[3,4,5,8,9,10], 2:[], 3:[], 4:[], 5:[],
        6:[], 7:[], 8:[], 9:[], 10:[1,5,10], 11:[]}
    
    markdays = JSON.parse(testr);
    console.log(markdays)
    //markdays = testr;
    
    
    const keys = Object.keys(markdays);
    for(let i = 0; i<keys.length; i++){
        for(let a = 0; a<markdays[i].length; a++){
            var objectTo = markdays[i][a]
            $(`#${i} .${objectTo}`).addClass('selected');
            
        }
    }
    
    console.log(markdays);

    function setData(){
        var cycles = []

        for(let i =0; i<keys.length; i++){
            var saveCycle = [];
            var count = 0;
            for(let a = 0; a<markdays[i].length; a++){
                console.log(`${saveCycle} vs ${markdays[i][a]}`)
                if(saveCycle.length === 0){
                    saveCycle.push(markdays[i][a]);
                }else if(a < (markdays[i].length - count)){
                    console.log(`${a} and my old ${markdays[i].length - count}`)
                    if(markdays[i][a] === (markdays[i][a - 1] + 1)){
                        saveCycle.push(markdays[i][a]);
                    }else{
                        cycles.push(saveCycle);
                        saveCycle = [];
                        count++;
                        a--;
                    }
                }else if (a === (markdays[i].length - count)){
                    saveCycle.push(markdays[i][a]);
                    cycles.push(saveCycle);
                }
            }
        }
        
        var totalLength = 0
        for(let i=0; i<cycles.length; i++){
           totalLength += cycles[i].length;
        }

        let averageCycleDuration = totalLength/cycles.length;

        $('#avrDuration').html(`Average Duration: ${averageCycleDuration} days`);
        $('#totalLogedDays').html(`Total Loged Days: ${totalLength}`);

        return cycles.length
    }
    
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
    console.log(`total cycles ${setData()}`);
    
    $('.day').click(function(){
        var markedDay = parseInt($(this).html());
        var monthId = $(this).parent().parent().attr('id');
        var checkeddays = markdays[monthId];
    
        if($(this).hasClass('selected')){
            $(this).removeClass('selected');
    
            for (let i = 0; i < markdays[monthId].length; i++) {
                if (markdays[monthId][i] === markedDay) {
                    markdays[monthId].splice(i, 1);
                    i--; // Update the loop variable to check the current index again
                }
            }
    
            console.log(markdays);
        }else{
            $(this).addClass('selected');
            if(checkeddays.includes(markedDay)){
                console.log('day allready selected');
            }else{
                markdays[monthId].push(markedDay)
                console.log(markdays);
            }
        
        }
     
    
    })
    
    var test = {hello:'bye'}
    
    $('#log').click(function(){
        var options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(markdays),
        }
        fetch('/user-data', options)
    })
    
    
    $('.selector').click(function(){
        console.log('HEY');
    
        if($(this).hasClass('side_right') || $(this).hasClass('side_left')){
            id = parseInt($(this).attr('id')) ;
            setCalendars(id);
        }
    })
    
    
    
    
  }), 50000)
