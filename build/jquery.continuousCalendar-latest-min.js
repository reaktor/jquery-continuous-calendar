$.continuousCalendar={};$.continuousCalendar.version="";$.continuousCalendar.released="2012-05-04";DateFormat={};DateFormat.parseFunctions={count:0};DateFormat.parseRegexes=[];DateFormat.formatFunctions={count:0};DateTime.prototype.format=function(b){if(DateFormat.formatFunctions[b]==null){this.createNewFormat(b)}var a=DateFormat.formatFunctions[b];return this[a]()};DateTime.prototype.createNewFormat=function(format){var funcName="format"+DateFormat.formatFunctions.count++;DateFormat.formatFunctions[format]=funcName;var code="DateTime.prototype."+funcName+" = function(){return ";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else{if(special){special=false;code+="'"+String.escape(ch)+"' + "}else{code+=DateTime.getFormatCode.call(this,ch)}}}eval(code.substring(0,code.length-3)+";}")};DateTime.getFormatCode=function(a){switch(a){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"this.locale.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"this.locale.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"this.locale.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"this.locale.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(a)+"' + "}};DateTime.parse=function(a,b,c){return DateFormat.parse(a,b,c)};DateFormat.parse=function(b,d,e){var a=Locale.fromArgument(e);if(b=="today"){return DateTime.now().withLocale(a)}if(DateFormat.parseFunctions[d+a.id]==null){DateFormat.createParser(d,a)}var c=DateFormat.parseFunctions[d+a.id];return DateFormat[c](b)};DateFormat.createParser=function(format,locale){var funcName="parse"+DateFormat.parseFunctions.count++;var regexNum=DateFormat.parseRegexes.length;var currentGroup=1;DateFormat.parseFunctions[format+locale.id]=funcName;var code="DateFormat."+funcName+" = function(input){\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1;\nvar d = DateTime.now().withLocale(locale);\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(DateFormat.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {";var regex="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else{if(special){special=false;regex+=String.escape(ch)}else{var obj=DateFormat.formatCodeToRegex(ch,currentGroup,locale);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){code+=obj.c}}}}code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new DateTime(new Date(y, m, d, h, i, s));}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new DateTime(new Date(y, m, d, h, i));}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new DateTime(new Date(y, m, d, h));}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new DateTime(new Date(y, m, d));}\nelse if (y > 0 && m >= 0)\n{return new DateTime(new Date(y, m));}\nelse if (y > 0)\n{return new DateTime(new Date(y));}\n}return null;}";DateFormat.parseRegexes[regexNum]=new RegExp("^"+regex+"$");eval(code)};DateFormat.formatCodeToRegex=function(c,b,a){switch(c){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+b+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+a.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:0,c:null,s:"(?:\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(DateTime.monthNumbers[results["+b+"].substring(0, 3)], 10);\n",s:"("+a.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(DateTime.monthNumbers[results["+b+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+b+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+b+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+b+"], 10);\ny = ty > DateTime.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+b+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+b+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+b+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+b+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+b+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};case".":return{g:0,c:null,s:"\\."};default:return{g:0,c:null,s:String.escape(c)}}};Locale={};Locale.MONDAY=1;Locale.FRIDAY=5;Locale.SUNDAY=0;Locale.hoursAndMinutes=function(a,b){return(Math.round((a+b/60)*100)/100).toString()};Locale.FI={id:"FI",monthNames:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],dayNames:["su","ma","ti","ke","to","pe","la"],yearsLabel:function(a){return a+" "+(a=="1"?"vuosi":"vuotta")},monthsLabel:function(a){return a+" "+(a=="1"?"kuukausi":"kuukautta")},daysLabel:function(a){return a+" "+(a=="1"?"päivä":"päivää")},hoursLabel:function(b,c){var a=Locale.hoursAndMinutes(b,c).replace(".",",");return a+" "+(a=="1"?"tunti":"tuntia")},shortDateFormat:"j.n.Y",weekDateFormat:"D j.n.Y",dateTimeFormat:"D j.n.Y k\\lo G:i",firstWeekday:Locale.MONDAY};Locale.EN={id:"EN",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],yearsLabel:function(a){return a+" "+(a=="1"?"Year":"Years")},monthsLabel:function(a){return a+" "+(a=="1"?"Months":"Months")},daysLabel:function(a){return a+" "+(a=="1"?"Day":"Days")},hoursLabel:function(b,c){var a=Locale.hoursAndMinutes(b,c);return a+" "+(a=="1"?"Hour":"Hours")},shortDateFormat:"n/j/Y",weekDateFormat:"D n/j/Y",dateTimeFormat:"D n/j/Y G:i",firstWeekday:Locale.SUNDAY};Locale.AU={id:"AU",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],yearsLabel:function(a){return a+" "+(a=="1"?"Year":"Years")},monthsLabel:function(a){return a+" "+(a=="1"?"Months":"Months")},daysLabel:function(a){return a+" "+(a=="1"?"Day":"Days")},hoursLabel:function(b,c){var a=Locale.hoursAndMinutes(b,c);return a+" "+(a=="1"?"Hour":"Hours")},shortDateFormat:"j/n/Y",weekDateFormat:"D j/n/Y",dateTimeFormat:"D j/n/Y G:i",firstWeekday:Locale.SUNDAY};Locale.DEFAULT=Locale.EN;Locale.fromArgument=function(a){if(typeof a=="string"){return Locale[a]}else{return a||Locale.DEFAULT}};function DateRange(d,c,a){var b=false;if(!d||!c){throw ("two dates must be specified, date1="+d+", date2="+c)}this.locale=Locale.fromArgument(a);this.start=(d.compareTo(c)>0?c:d).withLocale(this.locale);this.end=(d.compareTo(c)>0?d:c).withLocale(this.locale);this._days=0;this._hours=0;this._minutes=0;this._valid=true}DateRange.prototype={_setDaysHoursAndMinutes:function(){if(this._hasTimes){var a=parseInt((this.end.getTime()-this.start.getTime()));this._days=parseInt(a/DateTime.DAY);a=a-(this._days*DateTime.DAY);this._hours=parseInt(a/DateTime.HOUR);a=a-(this._hours*DateTime.HOUR);this._minutes=parseInt(a/DateTime.MINUTE)}},_dateWithTime:function(a,c){var b=a.clone();b.setHours(c[0]);b.setMinutes(c[1]);b.setMilliseconds(0);return b},hours:function(){return this._hours},minutes:function(){return this._minutes},hasDate:function(a){return a.isBetweenDates(this.start,this.end)},isValid:function(){return this._valid&&this.end.getTime()-this.start.getTime()>=0},days:function(){if(this._hasTimes){return this._days}else{return Math.round(this.start.distanceInDays(this.end)+1)}},shiftDays:function(a){return new DateRange(this.start.plusDays(a),this.end.plusDays(a),this.locale)},expandTo:function(b){var a=this.start.clone();var c=this.end.clone();if(b.compareTo(this.start)<0){a=b}else{if(b.compareTo(this.end)>0){c=b}}return new DateRange(a,c,this.locale)},expandDaysTo:function(a){return new DateRange(this.start,this.start.plusDays(a-1),this.locale)},hasValidSize:function(a){return a<0||this.days()>=a},hasValidSizeAndEndsOnWorkWeek:function(a){return this.hasValidSize(a)&&this.hasEndsOnWeekend()},and:function(a){var c=this.start.compareTo(a.start)>0?this.start:a.start;var b=this.end.compareTo(a.end)>0?a.end:this.end;if(c.compareTo(b)<0){return new DateRange(c,b,this.locale)}else{return DateRange.emptyRange()}},isInside:function(a){return this.start.compareTo(a.start)>=0&&this.end.compareTo(a.end)<=0},hasEndsOnWeekend:function(){return this.start.isWeekend()||this.end.isWeekend()},withTimes:function(e,d){var c=DateTime.parseTime(e);var a=DateTime.parseTime(d);var b=this.clone();if(c&&a){b._valid=true;b._hasTimes=true;b.start=this._dateWithTime(this.start,c);b.end=this._dateWithTime(this.end,a);b._setDaysHoursAndMinutes()}else{b._valid=false}return b},clone:function(){return new DateRange(this.start,this.end,this.locale)},toString:function(){if(this._hasTimes){return this.locale.daysLabel(this.days())+" "+this.locale.hoursLabel(this.hours(),this.minutes())}else{return this.start.format(this.locale.shortDateFormat)+" - "+this.end.format(this.locale.shortDateFormat)}},printDefiningDuration:function(){var b=parseInt(this.days()/360,10);if(b>0){return this.locale.yearsLabel(b)}var a=parseInt(this.days()/30,10);if(a>0){return this.locale.monthsLabel(a)}return this.locale.daysLabel(this.days())},isPermittedRange:function(c,a,b){return this.hasValidSize(c)&&(!(a&&this.hasEndsOnWeekend()))&&this.isInside(b)},shiftInside:function(b){if(this.days()>b.days()){return DateRange.emptyRange()}var c=this.start.distanceInDays(b.start);var a=this.end.distanceInDays(b.end);if(c>0){return this.shiftDays(c)}if(a<0){return this.shiftDays(a)}return this}};DateRange=$.extend(DateRange,{emptyRange:function(a){function b(c){this.start=null;this.end=null;this.locale=c;this.days=function(){return 0};this.shiftDays=$.noop;this.hasDate=function(){return false};this.clone=function(){return DateRange.emptyRange(c)}}return new b(Locale.fromArgument(a))},rangeWithMinimumSize:function(g,f,b,e){if(c()){var a=g.expandDaysTo(f);if(b&&a.hasEndsOnWeekend()){var d=a.shiftDays(h(a.end.getDay())).shiftInside(e);while(!d.isPermittedRange(f,b,e)||d.end.compareTo(e.end)>0){if(!d.isPermittedRange(f,false,e)){return DateRange.emptyRange()}d=d.shiftDays(1)}a=d}if(!a.isPermittedRange(f,false,e)){return DateRange.emptyRange()}return a}return g;function c(){return f&&g.days()<=f}function h(i){return -((i+1)%7+1)}}});DateTime=function(b,a){if(typeof b=="string"){this.date=new Date(b)}else{this.date=b||new Date()}this.locale=Locale.fromArgument(a)};DateTime.prototype.getTime=function(){return this.date.getTime()};DateTime.prototype.getDate=function(){return this.date.getDate()};DateTime.prototype.getMonth=function(){return this.date.getMonth()};DateTime.prototype.getHours=function(){return this.date.getHours()};DateTime.prototype.getHours=function(){return this.date.getHours()};DateTime.prototype.getFullYear=function(){return this.date.getFullYear()};DateTime.prototype.getYear=function(){return this.date.getYear()};DateTime.prototype.getDay=function(){return this.date.getDay()};DateTime.prototype.setTime=function(a){this.date.setTime(a)};DateTime.prototype.setHours=function(a){this.date.setHours(a)};DateTime.prototype.setMinutes=function(a){this.date.setMinutes(a)};DateTime.prototype.setMilliseconds=function(a){this.date.setMilliseconds(a)};DateTime.DAYS_IN_MONTH=[31,28,31,30,31,30,31,31,30,31,30,31];DateTime.SECOND=1000;DateTime.MINUTE=60*DateTime.SECOND;DateTime.HOUR=60*DateTime.MINUTE;DateTime.DAY=24*DateTime.HOUR;DateTime.WEEK=7*DateTime.DAY;DateTime.now=function(){if(typeof DateTime._now=="undefined"){DateTime._now=new DateTime()}return DateTime._now};DateTime.prototype.withLocale=function(a){return new DateTime(this.date,Locale.fromArgument(a))};DateTime.getDaysInMonth=function(a,b){if(((0==(a%4))&&((0!=(a%100))||(0==(a%400))))&&b==1){return 29}else{return DateTime.DAYS_IN_MONTH[b]}};DateTime.getDayInYear=function(c,d,a){var e=0;for(var b=0;b<d;b++){e+=DateTime.getDaysInMonth(c,b)}e+=a;return e};DateTime.prototype.getDaysInMonth=function(){return DateTime.getDaysInMonth(this.getFullYear(),this.getMonth())};DateTime.prototype.getDayInYear=function(){return DateTime.getDayInYear(this.getFullYear(),this.getMonth(),this.getDate())};DateTime.prototype.plusDays=function(d){var b=this.clone();var a=this.getHours();b.setTime(this.getTime()+d*DateTime.DAY);var c=a-b.getHours();if(c!=0){if(c>12){c-=24}if(c<-12){c+=24}b.setTime(b.getTime()+(c*DateTime.HOUR))}return b};DateTime.prototype.plusYears=function(b){var a=this.clone();a.setFullYear(this.getFullYear()+b);return a()};DateTime.prototype.stripped=function(){return new Date(parseInt(this.getTime()/DateTime.DAY,10))};DateTime.prototype.compareTo=function(b){if(!b){return 1}var a=this.getTime();var c=b.getTime();if(a<c){return -1}else{if(a>c){return 1}else{return 0}}};DateTime.prototype.compareDateOnlyTo=function(a){if(!a){return 1}return this.stripped().compareTo(a.stripped())};DateTime.prototype.isToday=function(){return this.equalsOnlyDate(DateTime.now())};DateTime.prototype.getWeekInYear=function(b){if(b!="US"&&b!="ISO"){throw ("Week numbering system must be either US or ISO, was "+b)}var a=new Date(this.getFullYear(),0,1).getDay();if(b=="US"){return Math.ceil((this.getDayInYear()+a)/7)}var e=4;var d=this.getDay();if(d==0){d=7}if(a==0){a=7}if(this.getMonth()==11&&this.getDate()>=29&&(this.getDate()-d)>27){return 1}if(this.getMonth()==0&&this.getDate()<4&&d>e){return new DateTime(new Date(this.getFullYear()-1,11,31)).getWeekInYear("ISO")}var c=Math.ceil((this.getDayInYear()+a-1)/7);if(a>e){c--}return c};DateTime.prototype.getFirstDateOfWeek=function(){var a=this.locale.firstWeekday;if(a<this.getDay()){return this.plusDays(a-this.getDay())}else{if(a>this.getDay()){return this.plusDays(a-this.getDay()-7)}else{return this.clone()}}};DateTime.prototype.hasMonthChangedOnPreviousWeek=function(a){var b=this.getFirstDateTimeOfWeek(a);var c=b.plusDays(-7);return b.getMonth()!=c.getMonth()};DateTime.prototype.clone=function(){return new DateTime(new Date(this.getTime()),this.locale)};DateTime.prototype.isOddMonth=function(){return this.getMonth()%2!=0};DateTime.prototype.equalsOnlyDate=function(a){if(!a){return false}return this.getMonth()==a.getMonth()&&this.getDate()==a.getDate()&&this.getYear()==a.getYear()};DateTime.prototype.isBetweenDates=function(b,a){return this.compareTo(b)>=0&&this.compareTo(a)<=0};DateTime.prototype.firstDateOfMonth=function(){return new DateTime((this.getMonth()+1)+"/1/"+this.getFullYear())};DateTime.prototype.lastDateOfMonth=function(){return new DateTime((this.getMonth()+1)+"/"+this.getDaysInMonth()+"/"+this.getFullYear())};DateTime.prototype.distanceInDays=function(a){var c=parseInt(this.getTime()/DateTime.DAY,10);var b=parseInt(a.getTime()/DateTime.DAY,10);return(b-c)};DateTime.prototype.withWeekday=function(a){return this.plusDays(a-this.getDay())};DateTime.prototype.getOnlyDate=function(){return new DateTime(new Date(this.getFullYear(),this.getMonth(),this.getDate()))};DateTime.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3")};DateTime.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(this.getTimezoneOffset()/60),2,"0")+String.leftPad(this.getTimezoneOffset()%60,2,"0")};DateTime.prototype.getDayOfYear=function(){var a=0;DateTime.daysInMonth[1]=this.isLeapYear()?29:28;for(var b=0;b<this.getMonth();++b){a+=DateTime.daysInMonth[b]}return a+this.getDate()-1};DateTime.prototype.getWeekOfYear=function(){var b=this.getDayOfYear()+(4-this.getDay());var a=new Date(this.getFullYear(),0,1);var c=(7-a.getDay()+4);document.write(c);return String.leftPad(((b-c)/7)+1,2,"0")};DateTime.prototype.isLeapYear=function(){var a=this.getFullYear();return((a&3)==0&&(a%100||(a%400==0&&a)))};DateTime.prototype.getFirstDayOfMonth=function(){var a=(this.getDay()-(this.getDate()-1))%7;return(a<0)?(a+7):a};DateTime.prototype.getLastDayOfMonth=function(){var a=(this.getDay()+(DateTime.daysInMonth[this.getMonth()]-this.getDate()))%7;return(a<0)?(a+7):a};DateTime.prototype.getDaysInMonth=function(){DateTime.daysInMonth[1]=this.isLeapYear()?29:28;return DateTime.daysInMonth[this.getMonth()]};DateTime.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}};DateTime.prototype.isWeekend=function(){return this.getDay()==6||this.getDay()==0};String.escape=function(a){return a.replace(/('|\\)/g,"\\$1")};String.leftPad=function(d,b,c){var a=new String(d);if(c==null){c=" "}while(a.length<b){a=c+a}return a};DateTime.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];DateTime.y2kYear=50;DateTime.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};DateTime.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",FiShortDatePattern:"j.n.Y",FiWeekdayDatePattern:"D j.n.Y",FiWeekdayDateTimePattern:"D j.n.Y k\\lo G:i",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};DateTime.parseTime=function(f){var c=b(f.replace(/:|,/i,"."));var e=[parseInt(c[0],10),parseInt(c[1],10)];return(a(e[0])&&d(e[1]))?e:null;function b(g){if(g.indexOf(".")!=-1){return g.split(".")}switch(g.length){case 4:return[g.slice(0,2),g.slice(2,4)];case 3:return[g.slice(0,1),g.slice(1,3)];case 2:return[g,0];default:return[-1,-1]}}function d(g){return !isNaN(g)&&g>=0&&g<=59}function a(g){return !isNaN(g)&&g>=0&&g<=23}};(function(a){a.fn.continuousCalendar=function(b){return this.each(function(){c.call(a(this),b)});function c(W){a(this).addClass("continuousCalendarContainer").append("&nbsp;");var O={weeksBefore:26,weeksAfter:26,firstDate:null,lastDate:null,startField:a("input.startDate",this),endField:a("input.endDate",this),isPopup:false,selectToday:false,locale:Locale.DEFAULT,disableWeekends:false,disabledDates:null,minimumRange:-1,selectWeek:false,fadeOutDuration:0,callback:a.noop};var am=a.extend({},O,W);am.locale=Locale.fromArgument(am.locale);var F={CREATE_OR_RESIZE:"create",MOVE:"move",NONE:"none"};var aw=p(am.startField);var ab=p(am.endField);var P=DateTime.now().withLocale(am.locale);if(am.selectToday){var g=B(P);aw=P;ab=P;l(g);ad(g)}var N=(aw||P).getFirstDateOfWeek();var ae=this,ag=[],az=[],ao={},f=null,I,R,ax,h,C,G=F.NONE,E,e,U=true,D,m;ar();function ar(){m=a.extend(ai(am.isPopup),ap(Z()));ax=aw&&ab?new DateRange(aw,ab,am.locale):DateRange.emptyRange(am.locale);h=ax.clone();var aD=am.firstDate?DateTime.parse(am.firstDate,am.locale.shortDateFormat,am.locale):N.plusDays(-(am.weeksBefore*7));var aC=am.lastDate?DateTime.parse(am.lastDate,am.locale.shortDateFormat,am.locale):N.plusDays(am.weeksAfter*7+6);am.disabledDates=am.disabledDates?ak(am.disabledDates):{};am.fadeOutDuration=parseInt(am.fadeOutDuration,10);C=new DateRange(aD,aC,am.locale);E=u();E.click(function(aE){aE.stopPropagation()});if(a(".startDateLabel",ae).isEmpty()){aq(ae,m)}m.initUI();m.showInitialSelection();m.performTrigger()}function aa(){if(e){return}var aC=a("<table>").addClass("calendarHeader").append(av());D=a("<table>").addClass("calendarBody").append(aA());e=a("<div>").addClass("calendarScrollContent").append(D);E.append(aC).append(e);ag=a("td.date",ae).get();m.initState();m.addRangeLengthLabel();o();R=a("th.month",aC);e.scroll(s);if(!am.isPopup){s();M()}m.initEvents()}function ak(aD){var aC={};a.each(aD.split(" "),function(aF,aE){aC[DateTime.parse(aE,am.locale.shortDateFormat).date]=true});return aC}function ap(aE){var aC={showInitialSelection:w,initEvents:function(){L(ae,D);an()},addRangeLengthLabel:function(){if(a(".rangeLengthLabel",ae).isEmpty()){var aF=a('<div class="label"><span class="rangeLengthLabel"></span></div>');a(".continuousCalendar",ae).append(aF)}},addEndDateLabel:function(aF){aF.append('<span class="separator"> - </span>').append('<span class="endDateLabel"></span>')},performTrigger:function(){ae.data("calendarRange",ax);ay(ax)}};var aD={showInitialSelection:function(){if(am.startField.val()){k(DateTime.parse(am.startField.val(),am.locale.shortDateFormat).format(am.locale.weekDateFormat))}},initEvents:function(){al();var aF=aw&&aw.format("Ymd");if(aF in ao){K(ao[aF]).addClass("selected")}},addRangeLengthLabel:a.noop,addEndDateLabel:a.noop,performTrigger:function(){ae.data("calendarRange",aw);ay(aw)}};return aE?aC:aD}function ai(aC){var aE={initUI:function(){E.addClass("popup").hide();var aF=a('<a href="#" class="calendarIcon">'+P.getDate()+"</a>").click(z);ae.prepend("<div></div>");ae.prepend(aF)},initState:a.noop,getContainer:function(aF){return a("<div>").addClass("popUpContainer").append(aF)},addCloseButton:function(aF){var aG=a('<th><a href="#"><span>close</span></a></th>');a("a",aG).click(z);aF.append(aG)},close:function(aF){z.call(aF)},addDateLabelBehaviour:function(aF){aF.addClass("clickable");aF.click(z)}};var aD={initUI:aa,initState:x,getContainer:function(aF){return aF},addCloseButton:a.noop,close:a.noop,addDateLabelBehaviour:a.noop};return aC?aE:aD}function o(){var aC=P.format("Ymd");if(aC in ao){K(ao[aC]).addClass("today").wrapInner("<div>")}}function u(){var aC=a(".continuousCalendar",ae);if(aC.exists()){return aC}else{var aD=a("<div>").addClass("continuousCalendar");ae.append(m.getContainer(aD));return aD}}function aq(aC,aE){var aD=a('<div class="label"><span class="startDateLabel"></span></div>');aE.addEndDateLabel(aD);aC.prepend(aD);aE.addDateLabelBehaviour(aD.children())}function L(aD,aC){a("span.rangeLengthLabel",aD).text(am.locale.daysLabel(ax.days()));aC.addClass(am.selectWeek?"weekRange":"freeRange");aC.mousedown(y).mouseover(ah).mouseup(v);aB(aC.get(0))}function M(){var aC=a(".selected, .today",e).get(0);if(aC){e.scrollTop(aC.offsetTop-(e.height()-aC.offsetHeight)/2)}}function s(){var aC=a(".calendarScrollContent",ae).get(0);var aF=a("table",aC).get(0);var aD=parseInt(aC.scrollTop/I);var aE=d(aF.rows[aD].cells[2]);R.text(aE.getFullYear())}function av(){var aD=a("<tr>").append(aC());aD.append(a('<th class="week">&nbsp;</th>'));a(am.locale.dayNames).each(function(aF){var aE=a("<th>").append(am.locale.dayNames[(aF+am.locale.firstWeekday)%7].substr(0,2)).addClass("weekDay");aD.append(aE)});m.addCloseButton(aD);return a("<thead>").append(aD);function aC(){return a("<th>").addClass("month").append(N.getFullYear())}}function x(){J();M()}function J(){I=parseInt(D.height()/a("tr",D).size())}function z(){aa();if(E.is(":visible")){E.fadeOut(am.fadeOutDuration);a(document).unbind("click.continuousCalendar")}else{E.show();if(U){J();s();U=false}M();a(document).bind("click.continuousCalendar",z)}return false}function aA(){var aD=C.start.getFirstDateOfWeek();var aC=true;var aE=[];while(aD.compareTo(C.end)<=0){S(aE,aD.clone(),aC);aC=false;aD=aD.plusDays(7)}return"<tbody>"+aE.join("")+"</tbody>"}function S(aG,aD,aC){aG.push("<tr>");aG.push(t(aD,aC));aG.push(Y(aD));for(var aF=0;aF<7;aF++){var aE=aD.plusDays(aF);aG.push(au(aE))}aG.push("</tr>")}function au(aC){var aD='<td class="'+A(aC)+'" date-cell-index="'+az.length+'">'+aC.getDate()+"</td>";ao[aC.format("Ymd")]=az.length;az.push(aC);return aD}function t(aD,aC){var aE='<th class="month '+ac(aD);if(aC||aD.getDate()<=7){aE+=' monthName">';aE+=am.locale.monthNames[aD.getMonth()]}else{aE+='">';if(aD.getDate()<=7*2&&aD.getMonth()==0){aE+=aD.getFullYear()}}return aE+"</th>"}function Y(aC){return'<th class="week '+ac(aC)+'">'+aC.getWeekInYear("ISO")+"</th>"}function A(aC){return a.trim(["date",ac(aC),n(aC),q(aC),af(aC)].sort().join(" "))}function ac(aC){return aC.isOddMonth()?"odd":""}function n(aC){var aD=am.disableWeekends&&aC.isWeekend();var aE=am.disabledDates[aC.getOnlyDate().date];var aF=!C.hasDate(aC);return aF||aD||aE?"disabled":""}function q(aC){return aC.isToday()?"today":""}function af(aC){return aC.getDay()==0?"holiday":""}function al(){a(".date",ae).bind("click",function(){var aD=a(this);if(aD.hasClass("disabled")){return}a("td.selected",ae).removeClass("selected");aD.addClass("selected");var aC=d(aD.get(0));am.startField.val(aC.format(am.locale.shortDateFormat));k(aC.format(am.locale.weekDateFormat));m.close(this);ay(aC)})}function X(){ax=new DateRange(f,f,am.locale)}function y(aG){var aF=aG.target;if(aH(aG)){ax=aE(aG);return}G=F.CREATE_OR_RESIZE;f=d(aF);if(f.equalsOnlyDate(ax.end)){f=ax.start;return}if(f.equalsOnlyDate(ax.start)){f=ax.end;return}if(ax.hasDate(f)){G=F.MOVE;return}if(aD(aF)){X()}function aD(aI){return H(aI)&&aj(aI)}function aH(aI){if(am.selectWeek){return aD(aI.target)||j(aI.target)}else{return j(aI.target)||T(aI.target)||aI.shiftKey}}function aE(aL){var aK=aL.target;if((am.selectWeek&&aD(aK))||j(aK)){G=F.NONE;var aI=d(a(aK).parent().children(".date").get(0));return aC(aI)}else{if(T(aK)){G=F.NONE;var aJ=d(a(aK).siblings(".date").get(0));return new DateRange(aJ.firstDateOfMonth(),aJ.lastDateOfMonth(),am.locale)}else{if(aL.shiftKey){if(ax.days()>0&&aD(aK)){G=F.NONE;ax=ax.expandTo(d(aK));return ax}}}}return ax}function aC(aJ){var aI=aJ;var aK=aJ.plusDays(6);if(am.disableWeekends){aI=aJ.withWeekday(Locale.MONDAY);aK=aJ.withWeekday(Locale.FRIDAY)}return new DateRange(aI,aK,am.locale).and(C)}}function ah(aD){if(G==F.NONE){return}var aC=d(aD.target);({move:function(){var aE=f.distanceInDays(aC);var aF=ax.shiftDays(aE).and(C);if(r(aF)){f=aC;ax=aF}},create:function(){var aE=new DateRange(f,aC,am.locale);if(aj(aD.target)&&r(aE)){ax=aE}}})[G]();an()}function r(aC){return aC.isPermittedRange(am.minimumRange,am.disableWeekends,C)}function v(){G=F.NONE;an();at()}function an(){ax=DateRange.rangeWithMinimumSize(ax,am.minimumRange,am.disableWeekends,C);V(ax);a("span.rangeLengthLabel",ae).text(am.locale.daysLabel(ax.days()))}function V(aC){a("td.selected",ae).removeClass("selected").removeClass("rangeStart").removeClass("rangeEnd");Q(aC);h=aC.clone()}function Q(aC){if(aC.days()==0){return}var aF=ao[aC.start.format("Ymd")];var aE=ao[aC.end.format("Ymd")];for(var aD=aF;aD<=aE;aD++){i(aD,aC.start,aC.end)}}function i(aF,aH,aC){var aE=az[aF];var aG=K(aF).get(0);var aD=[A(aE)];if(aE.equalsOnlyDate(aC)){aD.push("selected rangeEnd")}else{if(aE.equalsOnlyDate(aH)){aD.push("selected rangeStart")}else{if(aE.isBetweenDates(aH,aC)){aD.push("selected")}}}aG.className=aD.join(" ")}function at(){var aD=B(ax.start);var aC=B(ax.end);ae.data("calendarRange",ax);l(aD);ad(aC);w();if(am.selectWeek){m.close(a("td.selected",ae).first())}ay(ax)}function w(){if(ax.start&&ax.end){var aC=am.locale.weekDateFormat;a("span.startDateLabel",ae).text(ax.start.format(aC));a("span.endDateLabel",ae).text(ax.end.format(aC));a("span.separator",ae).show()}else{a("span.separator",ae).hide()}}function p(aC){return aC.length>0&&aC.val().length>0?DateTime.parse(aC.val(),am.locale.shortDateFormat):null}function aB(aC){if(a.browser.mozilla){a(aC).css("MozUserSelect","none")}else{if(a.browser.msie){a(aC).bind("selectstart",function(){return false})}else{a(aC).mousedown(function(){return false})}}}function ay(aC){am.callback.call(ae,aC);ae.trigger("calendarChange",aC)}function H(aC){return a(aC).hasClass("date")}function j(aC){return a(aC).hasClass("week")}function T(aC){return a(aC).hasClass("month")}function aj(aC){return !a(aC).hasClass("disabled")}function d(aC){return az[a(aC).closest("[date-cell-index]").attr("date-cell-index")]}function K(aC){return a(ag[aC])}function l(aC){am.startField.val(aC)}function ad(aC){am.endField.val(aC)}function B(aC){return aC.format(am.locale.shortDateFormat)}function k(aC){a("span.startDateLabel",ae).text(aC)}function Z(){return am.endField&&am.endField.length>0}}};a.fn.calendarRange=function(){return a(this).data("calendarRange")};a.fn.exists=function(){return this.length>0};a.fn.isEmpty=function(){return this.length==0}})(jQuery);