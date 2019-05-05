var rawDatas = {AC:{}, Light:{}, Temp:{}, SetP:{}, Total:{}};
var ch1
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
    //window.myLine.update();

    getLighting("2000-01-01", "2100-01-01", (response)=>{
        rawDatas.Light=response.data;
        if(timeStep=="m")  myData=getMonthly(rawDatas.Light, 2019, "sum");
        if(timeStep=="w")  myData=getWeekly(rawDatas.Light, 2019, "sum");
        if(timeStep=="d")  myData=getDaily(rawDatas.Light, "2019-05", "sum");
        if(timeStep=="y")  myData=getYearly(rawDatas.Light, 10 , "sum");
        makeChart(document.getElementById("myChart2_3"), myData, "Energy Usage From Lighting (KWh)");
    });
    getAC("2000-01-01", "2100-01-01", (response)=>{
        rawDatas.AC=response.data;
        if(timeStep=="m")  myData=getMonthly(rawDatas.AC, 2019, "sum");
        if(timeStep=="w")  myData=getWeekly(rawDatas.AC, 2019, "sum");
        if(timeStep=="d")  myData=getDaily(rawDatas.AC, "2019-05", "sum");
        if(timeStep=="y")  myData=getYearly(rawDatas.AC, 10 , "sum");
        makeChart(document.getElementById("myChart2_2"),myData, "Energy Usage From Air Conditioner (KWh)");
    });
    getTotal("2000-01-01", "2100-01-01", (response)=>{
        rawDatas.Total=response.data;
        if(timeStep=="m")  myData=getMonthly(rawDatas.Total, 2019, "sum");
        if(timeStep=="w")  myData=getWeekly(rawDatas.Total, 2019, "sum");
        if(timeStep=="d")  myData=getDaily(rawDatas.Total, "2019-05", "sum");
        if(timeStep=="y")  myData=getYearly(rawDatas.Total, 10 , "sum");
        makeChart(document.getElementById("myChart1_2"),myData, "Total Consumption (KWh)");
    });



});
var timeStep="m";

var Labels= {months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weeks:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53'],
            days:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
            years:['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019']};

function makeChart(ctx, myData, dataName){
    if(timeStep=="m"){
        xlabels=Labels.months;
    }
    if(timeStep=="w"){
        xlabels=Labels.weeks;
    }
    if(timeStep=="d"){
        xlabels=Labels.days;
    }
    if(timeStep=="y"){
        xlabels=Labels.years;
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: dataName,
                data: myData,
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
}