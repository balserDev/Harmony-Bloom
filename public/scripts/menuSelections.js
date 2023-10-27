
$(document).ready(setTimeout(function(){
    console.log(testr);
    const todaysMonth = new Date().getMonth() + 1;
    
    
    var markdays = {0:[], 1:[3,4,5,8,9,10], 2:[], 3:[], 4:[], 5:[],
        6:[], 7:[], 8:[], 9:[], 10:[1,5,10], 11:[]}
    
    markdays = JSON.parse(testr);
    console.log(markdays)
    //markdays = testr;
    
    
    const keys = Object.keys(markdays);
    let markedMonths = [];

    for(let i = 0; i<keys.length; i++){
        if(markdays[i].length > 0 ){
            markedMonths.push(i)
        }
        for(let a = 0; a<markdays[i].length; a++){
            var objectTo = markdays[i][a]
            $(`#${i} .${objectTo}`).addClass('selected');
           
        }
    }
    
    console.log(markdays);

    function drawDurationGraph(data){

        let topGraph = 20
        let topControll = []
        for(let a=0; a<data.length; a++){
            topControll.push(data[a].duration);
        }
        topControll.sort(function(a, b) {
            return a - b;
        });
        console.log('Graph ' + topControll);
        topGraph = (topControll[topControll.length - 1] + 2);
        

        const xScale = d3
            .scaleBand()
            .domain(data.map((dataPoint) => dataPoint.cycle))
            .rangeRound([0, 1000])
            .padding(0.4);
        const YScale = d3
            .scaleLinear()
            .domain([0, topGraph])
            .range([300,0]);


        const container = d3.select('.durationGraph')
            .classed('graphContainer', true);

        //var pathSelection = d3.select('.intersection').attr('d')
        const bars = container
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('circle')
            .classed('bar', true)
            .text(data => data.cycle)
            .attr('r', (xScale.bandwidth() - topGraph * 10))
           // .attr('height', (data) => 500 - YScale(data.duration))
            .attr('cx', data =>xScale(data.cycle))
            .attr('cy', data =>YScale(data.duration))
        
        var points = $('.bar');
        let path = ' '
        console.log(points)
        for(let i =0; i < points.length; i++ ){
            let point = points[i];
            let x = $(point).attr('cx');
            let y = $(point).attr('cy');
            if(path === ' '){
                path += `M ${x},${y} `
            }else{
                path += `L ${x},${y} `
            }
            
        }
        console.log("Test " + path);
        $('.intersection').attr('d', path);
    }


    function setData(){
        var cycles = []
        var durationChart = []


        var MonthMark = markedMonths[markedMonths.length-1];
        var lastMarkedMonth = markdays[markedMonths[markedMonths.length-1]];
        var lastDayMarked = lastMarkedMonth[lastMarkedMonth.length-1];

        var lastMarkedDayTotal = new Date(2023, MonthMark, 0).getDate();
        let monthDiference = lastMarkedDayTotal - lastDayMarked;
        console.log(`last marked month ${MonthMark}`)
        console.log(`last month:${MonthMark} last day ${lastDayMarked}, ${lastMarkedDayTotal - lastDayMarked} till the end of the month`);
        
        if(monthDiference >= 28){
            //Do soemthing if in range
        }else{
            var nextMonth = MonthMark + 1;
            var expectedDate = 28 - monthDiference;
            var expectedTotalTime = monthDiference + expectedDate

            console.log(`expected Date Booyyyyy month:${nextMonth} and day ${expectedDate}`)
            $(`#${nextMonth}`).children('.calendar').children(`.${expectedDate}`).addClass('next');;
            $('#nextCycle').html(`Next Cycle in: ${expectedTotalTime} days`);
            //out of range go to next month
        }

        for(let i =0; i<keys.length; i++){
            var saveCycle = [];
            var count = 0;
            markdays[i].sort(function(a, b) {
                return a - b;
            });
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
           var durationData = {'cycle':(i+1), 'duration':cycles[i].length}
           durationChart.push(durationData);
        }

        let averageCycleDuration = Math.round(totalLength/cycles.length);

        drawDurationGraph(durationChart);

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
