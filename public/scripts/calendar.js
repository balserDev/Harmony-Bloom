
export class Calendar {
    constructor(_year=new Date().getFullYear(), _month= (new Date().getMonth()) + 1){
        
        this.year = _year;
        this.month = _month;
        this.markDays = [];
        this.name = this.getMonthName();
        console.log(`${this.getMonthName()} Calendar Started`)
    }

    getMonthDays(){
        let  monthDays = new Date(this.year, this.month, 0).getDate();
        return monthDays
    }
    getMonthName(){
        let currentDate = new Date(this.year, this.month, 0);
        let monthName = currentDate.toLocaleString('default', { month: 'long' });
        return monthName;
    }
    markDay(day){
        let maxDays = this.getMonthDays();
        if(day > maxDays || day < 1){
            return(console.log(`day ${day} is out of month range`))
        }else if(this.markDays.includes(day)){
                console.log(`day ${day} allready marked`);      
        }else{
            this.markDays.push(day);
        }      
    }
      
}

export function generateCalendars(year){
    const calendars = []
    for(var i = 0; i < 12; i++){
        const calendar = new Calendar(year, i);
        calendars.push(calendar)
    }
    return calendars;
}
