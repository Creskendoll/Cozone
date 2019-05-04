var rawDatas = {AC:{}, Light:{}, Temp:{}, SetP:{}};

function getYearly(raw,N,type){ // getYearly(rawDatas.AC, 10,  "sum");
    var years=[]; for(i=0;i<N;i++) years[i]=[0,0];
    var minYear=new Date().getYear() - N + 1 + 1900;
    console.log(minYear);
    for (time in raw) {
        var value = raw[time];
        time = time.substring(0, 4)*1 - minYear;
        if(time<0) continue;
        years[time][0] += value;
        years[time][1]++;
    }
    if(type=="sum") for(i=0;i<years.length;i++) years[i]=years[i][0];
    else  for(i=0;i<years.length;i++)  years[i] = years[i][0]/(years[i][1]+(1e-15)); 
    return years;
}

function getMonthly(raw,year,type){ // getMonthly(rawDatas.AC, 2019, "sum");
    var months=[]; for(i=0;i<12;i++) months[i]=[0,0];
    for (time in raw) {
        var value = raw[time];
        if(time.substring(0,4) != year+"") continue;
        time = time.substring(5, 7) * 1 - 1;
        months[time][0] += value;
        months[time][1]++;
    }
    if(type=="sum") for(i=0;i<months.length;i++) months[i]=months[i][0];
    else  for(i=0;i<months.length;i++)  months[i] = months[i][0]/(months[i][1]+(1e-15)); 
    return months;
}

function getWeekly(raw,year,type){ //  getWeekly(rawDatas.AC, 2019, "sum");
    var weeks=[]; for(i=0;i<53;i++) weeks[i]=[0,0];
    for (time in raw) {
        var value = raw[time];
        var d=new Date(time);
        if(d.getWeekYear() != year) continue;
        time = d.getWeek()*1-1;
        weeks[time][0] += value;
        weeks[time][1]++;
    }
    if(type=="sum") for(i=0;i<weeks.length;i++) weeks[i]=weeks[i][0];
    else  for(i=0;i<weeks.length;i++)  weeks[i] = weeks[i][0]/(weeks[i][1]+(1e-15)); 
    return weeks;
}

function getDaily(raw,month,type){ // getDaily( rawDatas.AC, "2019-05", "sum");
    var days=[]; for(i=0;i<31;i++) days[i]=[0,0];
    for (time in raw) {
        var value = raw[time];
        if(time.substring(0,7) != month) continue;
        time = time.substring(8, 10)*1 - 1;
        days[time][0] += value;
        days[time][1]++;
    }
    if(type=="sum") for(i=0;i<days.length;i++) days[i]=days[i][0];
    else  for(i=0;i<days.length;i++)  days[i] = days[i][0]/(days[i][1]+(1e-15)); 
    return days;
    
}

Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
}
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
}



$(document).ready(function () {

    getLighting("2000-01-01", "2100-01-01", (response)=>{rawDatas.Light=response.data;});
    getAC("2000-01-01", "2100-01-01", (response)=>{rawDatas.AC=response.data;});
    getTemp("2000-01-01", "2100-01-01", (response)=>{rawDatas.Temp=response.data;});
    getSetPoint("2000-01-01", "2100-01-01", (response)=>{rawDatas.SetP=response.data;});

    var ctx = document.getElementById('myChart1_2').getContext('2d');
    ch1=new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: '# of Votes',
                data: [1,2,3,4,5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of Votes2',
                data: [2,3,4,5,6],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var ctx = document.getElementById('myChart2_2').getContext('2d');
    ch2=new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes3',
                data: [12, 19, 33, 533, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    var dataAC, graphAC = [[], [], [], []];

    function createChartsAC(response) {


        
    }


});