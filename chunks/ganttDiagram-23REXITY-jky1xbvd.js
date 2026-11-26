import{e,Qr,t,l,S,d,p,m,g,y,w,v,r,Bt,a,T}from"./main-r27nhh20.js";import{hi,fi,pi,Lt,Ue,Mt,It,Xe,mt,Ot,Ln,Mn,ht,In,On,Nt,Ht,He,gi}from"./main-39ba7v6n.js";import{ne,le}from"./main-yjwgaf4b.js";var Me=le(function(Kt,Jt){(function(i,n){typeof Kt=="object"&&typeof Jt<"u"?Jt.exports=n():typeof define=="function"&&define.amd?define(n):(i=typeof globalThis<"u"?globalThis:i||self).dayjs_plugin_isoWeek=n()})(Kt,function(){var i="day";return function(n,c,o){var u=function(P){return P.add(4-P.isoWeekday(),i)},x=c.prototype;x.isoWeekYear=function(){return u(this).year()},x.isoWeek=function(P){if(!this.$utils().u(P))return this.add(7*(P-this.isoWeek()),i);var W,K,B,et,z=u(this),R=(W=this.isoWeekYear(),K=this.$u,B=(K?o.utc:o)().year(W).startOf("year"),et=4-B.isoWeekday(),B.isoWeekday()>4&&(et+=7),B.add(et,i));return z.diff(R,"week")+1},x.isoWeekday=function(P){return this.$utils().u(P)?this.day()||7:this.day(this.day()%7?P:P-7)};var E=x.startOf;x.startOf=function(P,W){var K=this.$utils(),B=!!K.u(W)||W;return K.p(P)==="isoweek"?B?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):E.bind(this)(P,W)}}})});var Ee=le(function(te,ee){(function(i,n){typeof te=="object"&&typeof ee<"u"?ee.exports=n():typeof define=="function"&&define.amd?define(n):(i=typeof globalThis<"u"?globalThis:i||self).dayjs_plugin_customParseFormat=n()})(te,function(){var i={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,c=/\d/,o=/\d\d/,u=/\d\d?/,x=/\d*[^-_:/,()\s\d]+/,E={},P=function(F){return(F=+F)+(F>68?1900:2000)},W=function(F){return function(V){this[F]=+V}},K=[/[+-]\d\d:?(\d\d)?|Z/,function(F){(this.zone||(this.zone={})).offset=function(V){if(!V)return 0;if(V==="Z")return 0;var O=V.match(/([+-]|\d\d)/g),Z=60*O[1]+(+O[2]||0);return Z===0?0:O[0]==="+"?-Z:Z}(F)}],B=function(F){var V=E[F];return V&&(V.indexOf?V:V.s.concat(V.f))},et=function(F,V){var O,Z=E.meridiem;if(Z){for(var rt=1;rt<=24;rt+=1)if(F.indexOf(Z(rt,0,V))>-1){O=rt>12;break}}else O=F===(V?"pm":"PM");return O},z={A:[x,function(F){this.afternoon=et(F,!1)}],a:[x,function(F){this.afternoon=et(F,!0)}],Q:[c,function(F){this.month=3*(F-1)+1}],S:[c,function(F){this.milliseconds=100*+F}],SS:[o,function(F){this.milliseconds=10*+F}],SSS:[/\d{3}/,function(F){this.milliseconds=+F}],s:[u,W("seconds")],ss:[u,W("seconds")],m:[u,W("minutes")],mm:[u,W("minutes")],H:[u,W("hours")],h:[u,W("hours")],HH:[u,W("hours")],hh:[u,W("hours")],D:[u,W("day")],DD:[o,W("day")],Do:[x,function(F){var V=E.ordinal,O=F.match(/\d+/);if(this.day=O[0],V)for(var Z=1;Z<=31;Z+=1)V(Z).replace(/\[|\]/g,"")===F&&(this.day=Z)}],w:[u,W("week")],ww:[o,W("week")],M:[u,W("month")],MM:[o,W("month")],MMM:[x,function(F){var V=B("months"),O=(B("monthsShort")||V.map(function(Z){return Z.slice(0,3)})).indexOf(F)+1;if(O<1)throw Error();this.month=O%12||O}],MMMM:[x,function(F){var V=B("months").indexOf(F)+1;if(V<1)throw Error();this.month=V%12||V}],Y:[/[+-]?\d+/,W("year")],YY:[o,function(F){this.year=P(F)}],YYYY:[/\d{4}/,W("year")],Z:K,ZZ:K};function R(F){var V,O;V=F,O=E&&E.formats;for(var Z=(F=V.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(Q,q,C){var A=C&&C.toUpperCase();return q||O[C]||i[C]||O[A].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(I,L,f){return L||f.slice(1)})})).match(n),rt=Z.length,st=0;st<rt;st+=1){var U=Z[st],Y=z[U],_=Y&&Y[0],N=Y&&Y[1];Z[st]=N?{regex:_,parser:N}:U.replace(/^\[|\]$/g,"")}return function(Q){for(var q={},C=0,A=0;C<rt;C+=1){var I=Z[C];if(typeof I=="string")A+=I.length;else{var{regex:L,parser:f}=I,M=Q.slice(A),D=L.exec(M)[0];f.call(q,D),Q=Q.replace(D,"")}}return function(b){var j=b.afternoon;if(j!==void 0){var s=b.hours;j?s<12&&(b.hours+=12):s===12&&(b.hours=0),delete b.afternoon}}(q),q}}return function(F,V,O){O.p.customParseFormat=!0,F&&F.parseTwoDigitYear&&(P=F.parseTwoDigitYear);var Z=V.prototype,rt=Z.parse;Z.parse=function(st){var{date:U,utc:Y,args:_}=st;this.$u=Y;var N=_[1];if(typeof N=="string"){var Q=_[2]===!0,q=_[3]===!0,C=Q||q,A=_[2];q&&(A=_[2]),E=this.$locale(),!Q&&A&&(E=O.Ls[A]),this.$d=function(M,D,b,j){try{if(["x","X"].indexOf(D)>-1)return new Date((D==="X"?1000:1)*M);var s=R(D)(M),{year:G,month:k,day:at,hours:h,minutes:H,seconds:X,milliseconds:it,zone:nt,week:J}=s,tt=new Date,yt=at||(G||k?1:tt.getDate()),gt=G||tt.getFullYear(),xt=0;G&&!k||(xt=k>0?k-1:tt.getMonth());var wt,_t=h||0,ot=H||0,Tt=X||0,ft=it||0;return nt?new Date(Date.UTC(gt,xt,yt,_t,ot,Tt,ft+60*nt.offset*1000)):b?new Date(Date.UTC(gt,xt,yt,_t,ot,Tt,ft)):(wt=new Date(gt,xt,yt,_t,ot,Tt,ft),J&&(wt=j(wt).week(J).toDate()),wt)}catch(lt){return new Date("")}}(U,N,Y,O),this.init(),A&&A!==!0&&(this.$L=this.locale(A).$L),C&&U!=this.format(N)&&(this.$d=new Date("")),E={}}else if(N instanceof Array)for(var I=N.length,L=1;L<=I;L+=1){_[1]=N[L-1];var f=O.apply(this,_);if(f.isValid()){this.$d=f.$d,this.$L=f.$L,this.init();break}L===I&&(this.$d=new Date(""))}else rt.call(this,st)}}})});var Ie=le(function(ie,re){(function(i,n){typeof ie=="object"&&typeof re<"u"?re.exports=n():typeof define=="function"&&define.amd?define(n):(i=typeof globalThis<"u"?globalThis:i||self).dayjs_plugin_advancedFormat=n()})(ie,function(){return function(i,n){var c=n.prototype,o=c.format;c.format=function(u){var x=this,E=this.$locale();if(!this.isValid())return o.bind(this)(u);var P=this.$utils(),W=(u||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(K){switch(K){case"Q":return Math.ceil((x.$M+1)/3);case"Do":return E.ordinal(x.$D);case"gggg":return x.weekYear();case"GGGG":return x.isoWeekYear();case"wo":return E.ordinal(x.week(),"W");case"w":case"ww":return P.s(x.week(),K==="w"?1:2,"0");case"W":case"WW":return P.s(x.isoWeek(),K==="W"?1:2,"0");case"k":case"kk":return P.s(String(x.$H===0?24:x.$H),K==="k"?1:2,"0");case"X":return Math.floor(x.$d.getTime()/1000);case"x":return x.$d.getTime();case"z":return"["+x.offsetName()+"]";case"zzz":return"["+x.offsetName("long")+"]";default:return K}});return o.bind(this)(W)}}})});var Ye=le(function(se,ae){(function(i,n){typeof se=="object"&&typeof ae<"u"?ae.exports=n():typeof define=="function"&&define.amd?define(n):(i=typeof globalThis<"u"?globalThis:i||self).dayjs_plugin_duration=n()})(se,function(){var i,n,c=1000,o=60000,u=3600000,x=86400000,E=31536000000,P=2628000000,W=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,K=/\[([^\]]+)]|YYYY|YY|Y|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g,B={years:E,months:P,days:x,hours:u,minutes:o,seconds:c,milliseconds:1,weeks:604800000},et=function(U){return U instanceof rt},z=function(U,Y,_){return new rt(U,_,Y.$l)},R=function(U){return n.p(U)+"s"},F=function(U){return U<0},V=function(U){return F(U)?Math.ceil(U):Math.floor(U)},O=function(U){return Math.abs(U)},Z=function(U,Y){return U?F(U)?{negative:!0,format:""+O(U)+Y}:{negative:!1,format:""+U+Y}:{negative:!1,format:""}},rt=function(){function U(_,N,Q){var q=this;if(this.$d={},this.$l=Q,_===void 0&&(this.$ms=0,this.parseFromMilliseconds()),N)return z(_*B[R(N)],this);if(typeof _=="number")return this.$ms=_,this.parseFromMilliseconds(),this;if(typeof _=="object")return Object.keys(_).forEach(function(I){q.$d[R(I)]=_[I]}),this.calMilliseconds(),this;if(typeof _=="string"){var C=_.match(W);if(C){var A=C.slice(2).map(function(I){return I!=null?Number(I):0});return this.$d.years=A[0],this.$d.months=A[1],this.$d.weeks=A[2],this.$d.days=A[3],this.$d.hours=A[4],this.$d.minutes=A[5],this.$d.seconds=A[6],this.calMilliseconds(),this}}return this}var Y=U.prototype;return Y.calMilliseconds=function(){var _=this;this.$ms=Object.keys(this.$d).reduce(function(N,Q){return N+(_.$d[Q]||0)*B[Q]},0)},Y.parseFromMilliseconds=function(){var _=this.$ms;this.$d.years=V(_/E),_%=E,this.$d.months=V(_/P),_%=P,this.$d.days=V(_/x),_%=x,this.$d.hours=V(_/u),_%=u,this.$d.minutes=V(_/o),_%=o,this.$d.seconds=V(_/c),_%=c,this.$d.milliseconds=_},Y.toISOString=function(){var _=Z(this.$d.years,"Y"),N=Z(this.$d.months,"M"),Q=+this.$d.days||0;this.$d.weeks&&(Q+=7*this.$d.weeks);var q=Z(Q,"D"),C=Z(this.$d.hours,"H"),A=Z(this.$d.minutes,"M"),I=this.$d.seconds||0;this.$d.milliseconds&&(I+=this.$d.milliseconds/1000,I=Math.round(1000*I)/1000);var L=Z(I,"S"),f=_.negative||N.negative||q.negative||C.negative||A.negative||L.negative,M=C.format||A.format||L.format?"T":"",D=(f?"-":"")+"P"+_.format+N.format+q.format+M+C.format+A.format+L.format;return D==="P"||D==="-P"?"P0D":D},Y.toJSON=function(){return this.toISOString()},Y.format=function(_){var N=_||"YYYY-MM-DDTHH:mm:ss",Q={Y:this.$d.years,YY:n.s(this.$d.years,2,"0"),YYYY:n.s(this.$d.years,4,"0"),M:this.$d.months,MM:n.s(this.$d.months,2,"0"),D:this.$d.days,DD:n.s(this.$d.days,2,"0"),H:this.$d.hours,HH:n.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:n.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:n.s(this.$d.seconds,2,"0"),SSS:n.s(this.$d.milliseconds,3,"0")};return N.replace(K,function(q,C){return C||String(Q[q])})},Y.as=function(_){return this.$ms/B[R(_)]},Y.get=function(_){var N=this.$ms,Q=R(_);return Q==="milliseconds"?N%=1000:N=Q==="weeks"?V(N/B[Q]):this.$d[Q],N||0},Y.add=function(_,N,Q){var q;return q=N?_*B[R(N)]:et(_)?_.$ms:z(_,this).$ms,z(this.$ms+q*(Q?-1:1),this)},Y.subtract=function(_,N){return this.add(_,N,!0)},Y.locale=function(_){var N=this.clone();return N.$l=_,N},Y.clone=function(){return z(this.$ms,this)},Y.humanize=function(_){return i().add(this.$ms,"ms").locale(this.$l).fromNow(!_)},Y.valueOf=function(){return this.asMilliseconds()},Y.milliseconds=function(){return this.get("milliseconds")},Y.asMilliseconds=function(){return this.as("milliseconds")},Y.seconds=function(){return this.get("seconds")},Y.asSeconds=function(){return this.as("seconds")},Y.minutes=function(){return this.get("minutes")},Y.asMinutes=function(){return this.as("minutes")},Y.hours=function(){return this.get("hours")},Y.asHours=function(){return this.as("hours")},Y.days=function(){return this.get("days")},Y.asDays=function(){return this.as("days")},Y.weeks=function(){return this.get("weeks")},Y.asWeeks=function(){return this.as("weeks")},Y.months=function(){return this.get("months")},Y.asMonths=function(){return this.as("months")},Y.years=function(){return this.get("years")},Y.asYears=function(){return this.as("years")},U}(),st=function(U,Y,_){return U.add(Y.years()*_,"y").add(Y.months()*_,"M").add(Y.days()*_,"d").add(Y.hours()*_,"h").add(Y.minutes()*_,"m").add(Y.seconds()*_,"s").add(Y.milliseconds()*_,"ms")};return function(U,Y,_){i=_,n=_().$utils(),_.duration=function(q,C){var A=_.locale();return z(q,{$l:A},C)},_.isDuration=et;var N=Y.prototype.add,Q=Y.prototype.subtract;Y.prototype.add=function(q,C){return et(q)?st(this,q,1):N.bind(this)(q,C)},Y.prototype.subtract=function(q,C){return et(q)?st(this,q,-1):Q.bind(this)(q,C)}}})});function Je(i){return i}var zt=1,Zt=2,Qt=3,Pt=4,_e=0.000001;function ti(i){return"translate("+i+",0)"}function ei(i){return"translate(0,"+i+")"}function ii(i){return(n)=>+i(n)}function ni(i,n){if(n=Math.max(0,i.bandwidth()-n*2)/2,i.round())n=Math.round(n);return(c)=>+i(c)+n}function ri(){return!this.__axis}function De(i,n){var c=[],o=null,u=null,x=6,E=6,P=3,W=typeof window<"u"&&window.devicePixelRatio>1?0:0.5,K=i===zt||i===Pt?-1:1,B=i===Pt||i===Zt?"x":"y",et=i===zt||i===Qt?ti:ei;function z(R){var F=o==null?n.ticks?n.ticks.apply(n,c):n.domain():o,V=u==null?n.tickFormat?n.tickFormat.apply(n,c):Je:u,O=Math.max(x,0)+P,Z=n.range(),rt=+Z[0]+W,st=+Z[Z.length-1]+W,U=(n.bandwidth?ni:ii)(n.copy(),W),Y=R.selection?R.selection():R,_=Y.selectAll(".domain").data([null]),N=Y.selectAll(".tick").data(F,n).order(),Q=N.exit(),q=N.enter().append("g").attr("class","tick"),C=N.select("line"),A=N.select("text");if(_=_.merge(_.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),N=N.merge(q),C=C.merge(q.append("line").attr("stroke","currentColor").attr(B+"2",K*x)),A=A.merge(q.append("text").attr("fill","currentColor").attr(B,K*O).attr("dy",i===zt?"0em":i===Qt?"0.71em":"0.32em")),R!==Y)_=_.transition(R),N=N.transition(R),C=C.transition(R),A=A.transition(R),Q=Q.transition(R).attr("opacity",_e).attr("transform",function(I){return isFinite(I=U(I))?et(I+W):this.getAttribute("transform")}),q.attr("opacity",_e).attr("transform",function(I){var L=this.parentNode.__axis;return et((L&&isFinite(L=L(I))?L:U(I))+W)});Q.remove(),_.attr("d",i===Pt||i===Zt?E?"M"+K*E+","+rt+"H"+W+"V"+st+"H"+K*E:"M"+W+","+rt+"V"+st:E?"M"+rt+","+K*E+"V"+W+"H"+st+"V"+K*E:"M"+rt+","+W+"H"+st),N.attr("opacity",1).attr("transform",function(I){return et(U(I)+W)}),C.attr(B+"2",K*x),A.attr(B,K*O).text(V),Y.filter(ri).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",i===Zt?"start":i===Pt?"end":"middle"),Y.each(function(){this.__axis=U})}return z.scale=function(R){return arguments.length?(n=R,z):n},z.ticks=function(){return c=Array.from(arguments),z},z.tickArguments=function(R){return arguments.length?(c=R==null?[]:Array.from(R),z):c.slice()},z.tickValues=function(R){return arguments.length?(o=R==null?null:Array.from(R),z):o&&o.slice()},z.tickFormat=function(R){return arguments.length?(u=R,z):u},z.tickSize=function(R){return arguments.length?(x=E=+R,z):x},z.tickSizeInner=function(R){return arguments.length?(x=+R,z):x},z.tickSizeOuter=function(R){return arguments.length?(E=+R,z):E},z.tickPadding=function(R){return arguments.length?(P=+R,z):P},z.offset=function(R){return arguments.length?(W=+R,z):W},z}function Se(i){return De(zt,i)}function Ce(i){return De(Qt,i)}var Fe=ne(Bt(),1),ut=ne(Qr(),1),Oe=ne(Me(),1),We=ne(Ee(),1),Ve=ne(Ie(),1),Ct=ne(Qr(),1),Ke=ne(Ye(),1);var ce=function(){var i=e(function(L,f,M,D){for(M=M||{},D=L.length;D--;M[L[D]]=f);return M},"o"),n=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],c=[1,26],o=[1,27],u=[1,28],x=[1,29],E=[1,30],P=[1,31],W=[1,32],K=[1,33],B=[1,34],et=[1,9],z=[1,10],R=[1,11],F=[1,12],V=[1,13],O=[1,14],Z=[1,15],rt=[1,16],st=[1,19],U=[1,20],Y=[1,21],_=[1,22],N=[1,23],Q=[1,25],q=[1,35],C={trace:e(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:e(function(f,M,D,b,j,s,G){var k=s.length-1;switch(j){case 1:return s[k-1];case 2:this.$=[];break;case 3:s[k-1].push(s[k]),this.$=s[k-1];break;case 4:case 5:this.$=s[k];break;case 6:case 7:this.$=[];break;case 8:b.setWeekday("monday");break;case 9:b.setWeekday("tuesday");break;case 10:b.setWeekday("wednesday");break;case 11:b.setWeekday("thursday");break;case 12:b.setWeekday("friday");break;case 13:b.setWeekday("saturday");break;case 14:b.setWeekday("sunday");break;case 15:b.setWeekend("friday");break;case 16:b.setWeekend("saturday");break;case 17:b.setDateFormat(s[k].substr(11)),this.$=s[k].substr(11);break;case 18:b.enableInclusiveEndDates(),this.$=s[k].substr(18);break;case 19:b.TopAxis(),this.$=s[k].substr(8);break;case 20:b.setAxisFormat(s[k].substr(11)),this.$=s[k].substr(11);break;case 21:b.setTickInterval(s[k].substr(13)),this.$=s[k].substr(13);break;case 22:b.setExcludes(s[k].substr(9)),this.$=s[k].substr(9);break;case 23:b.setIncludes(s[k].substr(9)),this.$=s[k].substr(9);break;case 24:b.setTodayMarker(s[k].substr(12)),this.$=s[k].substr(12);break;case 27:b.setDiagramTitle(s[k].substr(6)),this.$=s[k].substr(6);break;case 28:this.$=s[k].trim(),b.setAccTitle(this.$);break;case 29:case 30:this.$=s[k].trim(),b.setAccDescription(this.$);break;case 31:b.addSection(s[k].substr(8)),this.$=s[k].substr(8);break;case 33:b.addTask(s[k-1],s[k]),this.$="task";break;case 34:this.$=s[k-1],b.setClickEvent(s[k-1],s[k],null);break;case 35:this.$=s[k-2],b.setClickEvent(s[k-2],s[k-1],s[k]);break;case 36:this.$=s[k-2],b.setClickEvent(s[k-2],s[k-1],null),b.setLink(s[k-2],s[k]);break;case 37:this.$=s[k-3],b.setClickEvent(s[k-3],s[k-2],s[k-1]),b.setLink(s[k-3],s[k]);break;case 38:this.$=s[k-2],b.setClickEvent(s[k-2],s[k],null),b.setLink(s[k-2],s[k-1]);break;case 39:this.$=s[k-3],b.setClickEvent(s[k-3],s[k-1],s[k]),b.setLink(s[k-3],s[k-2]);break;case 40:this.$=s[k-1],b.setLink(s[k-1],s[k]);break;case 41:case 47:this.$=s[k-1]+" "+s[k];break;case 42:case 43:case 45:this.$=s[k-2]+" "+s[k-1]+" "+s[k];break;case 44:case 46:this.$=s[k-3]+" "+s[k-2]+" "+s[k-1]+" "+s[k];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},i(n,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:c,13:o,14:u,15:x,16:E,17:P,18:W,19:18,20:K,21:B,22:et,23:z,24:R,25:F,26:V,27:O,28:Z,29:rt,30:st,31:U,33:Y,35:_,36:N,37:24,38:Q,40:q},i(n,[2,7],{1:[2,1]}),i(n,[2,3]),{9:36,11:17,12:c,13:o,14:u,15:x,16:E,17:P,18:W,19:18,20:K,21:B,22:et,23:z,24:R,25:F,26:V,27:O,28:Z,29:rt,30:st,31:U,33:Y,35:_,36:N,37:24,38:Q,40:q},i(n,[2,5]),i(n,[2,6]),i(n,[2,17]),i(n,[2,18]),i(n,[2,19]),i(n,[2,20]),i(n,[2,21]),i(n,[2,22]),i(n,[2,23]),i(n,[2,24]),i(n,[2,25]),i(n,[2,26]),i(n,[2,27]),{32:[1,37]},{34:[1,38]},i(n,[2,30]),i(n,[2,31]),i(n,[2,32]),{39:[1,39]},i(n,[2,8]),i(n,[2,9]),i(n,[2,10]),i(n,[2,11]),i(n,[2,12]),i(n,[2,13]),i(n,[2,14]),i(n,[2,15]),i(n,[2,16]),{41:[1,40],43:[1,41]},i(n,[2,4]),i(n,[2,28]),i(n,[2,29]),i(n,[2,33]),i(n,[2,34],{42:[1,42],43:[1,43]}),i(n,[2,40],{41:[1,44]}),i(n,[2,35],{43:[1,45]}),i(n,[2,36]),i(n,[2,38],{42:[1,46]}),i(n,[2,37]),i(n,[2,39])],defaultActions:{},parseError:e(function(f,M){if(M.recoverable)this.trace(f);else{var D=Error(f);throw D.hash=M,D}},"parseError"),parse:e(function(f){var M=this,D=[0],b=[],j=[null],s=[],G=this.table,k="",at=0,h=0,H=0,X=2,it=1,nt=s.slice.call(arguments,1),J=Object.create(this.lexer),tt={yy:{}};for(var yt in this.yy)if(Object.prototype.hasOwnProperty.call(this.yy,yt))tt.yy[yt]=this.yy[yt];if(J.setInput(f,tt.yy),tt.yy.lexer=J,tt.yy.parser=this,typeof J.yylloc>"u")J.yylloc={};var gt=J.yylloc;s.push(gt);var xt=J.options&&J.options.ranges;if(typeof tt.yy.parseError==="function")this.parseError=tt.yy.parseError;else this.parseError=Object.getPrototypeOf(this).parseError;function wt(dt){D.length=D.length-2*dt,j.length=j.length-dt,s.length=s.length-dt}e(wt,"popStack");function _t(){var dt=b.pop()||J.lex()||it;if(typeof dt!=="number"){if(dt instanceof Array)b=dt,dt=b.pop();dt=M.symbols_[dt]||dt}return dt}e(_t,"lex");var ot,Tt,ft,lt,Ji,Ut,Dt={},Wt,pt,we,Vt;while(!0){if(ft=D[D.length-1],this.defaultActions[ft])lt=this.defaultActions[ft];else{if(ot===null||typeof ot>"u")ot=_t();lt=G[ft]&&G[ft][ot]}if(typeof lt>"u"||!lt.length||!lt[0]){var qt="";Vt=[];for(Wt in G[ft])if(this.terminals_[Wt]&&Wt>X)Vt.push("'"+this.terminals_[Wt]+"'");if(J.showPosition)qt="Parse error on line "+(at+1)+`:
`+J.showPosition()+`
Expecting `+Vt.join(", ")+", got '"+(this.terminals_[ot]||ot)+"'";else qt="Parse error on line "+(at+1)+": Unexpected "+(ot==it?"end of input":"'"+(this.terminals_[ot]||ot)+"'");this.parseError(qt,{text:J.match,token:this.terminals_[ot]||ot,line:J.yylineno,loc:gt,expected:Vt})}if(lt[0]instanceof Array&&lt.length>1)throw Error("Parse Error: multiple actions possible at state: "+ft+", token: "+ot);switch(lt[0]){case 1:if(D.push(ot),j.push(J.yytext),s.push(J.yylloc),D.push(lt[1]),ot=null,!Tt){if(h=J.yyleng,k=J.yytext,at=J.yylineno,gt=J.yylloc,H>0)H--}else ot=Tt,Tt=null;break;case 2:if(pt=this.productions_[lt[1]][1],Dt.$=j[j.length-pt],Dt._$={first_line:s[s.length-(pt||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(pt||1)].first_column,last_column:s[s.length-1].last_column},xt)Dt._$.range=[s[s.length-(pt||1)].range[0],s[s.length-1].range[1]];if(Ut=this.performAction.apply(Dt,[k,h,at,tt.yy,lt[1],j,s].concat(nt)),typeof Ut<"u")return Ut;if(pt)D=D.slice(0,-1*pt*2),j=j.slice(0,-1*pt),s=s.slice(0,-1*pt);D.push(this.productions_[lt[1]][0]),j.push(Dt.$),s.push(Dt._$),we=G[D[D.length-2]][D[D.length-1]],D.push(we);break;case 3:return!0}}return!0},"parse")},A=function(){var L={EOF:1,parseError:e(function(M,D){if(this.yy.parser)this.yy.parser.parseError(M,D);else throw Error(M)},"parseError"),setInput:e(function(f,M){if(this.yy=M||this.yy||{},this._input=f,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges)this.yylloc.range=[0,0];return this.offset=0,this},"setInput"),input:e(function(){var f=this._input[0];this.yytext+=f,this.yyleng++,this.offset++,this.match+=f,this.matched+=f;var M=f.match(/(?:\r\n?|\n).*/g);if(M)this.yylineno++,this.yylloc.last_line++;else this.yylloc.last_column++;if(this.options.ranges)this.yylloc.range[1]++;return this._input=this._input.slice(1),f},"input"),unput:e(function(f){var M=f.length,D=f.split(/(?:\r\n?|\n)/g);this._input=f+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-M),this.offset-=M;var b=this.match.split(/(?:\r\n?|\n)/g);if(this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),D.length-1)this.yylineno-=D.length-1;var j=this.yylloc.range;if(this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:D?(D.length===b.length?this.yylloc.first_column:0)+b[b.length-D.length].length-D[0].length:this.yylloc.first_column-M},this.options.ranges)this.yylloc.range=[j[0],j[0]+this.yyleng-M];return this.yyleng=this.yytext.length,this},"unput"),more:e(function(){return this._more=!0,this},"more"),reject:e(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:e(function(f){this.unput(this.match.slice(f))},"less"),pastInput:e(function(){var f=this.matched.substr(0,this.matched.length-this.match.length);return(f.length>20?"...":"")+f.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:e(function(){var f=this.match;if(f.length<20)f+=this._input.substr(0,20-f.length);return(f.substr(0,20)+(f.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:e(function(){var f=this.pastInput(),M=Array(f.length+1).join("-");return f+this.upcomingInput()+`
`+M+"^"},"showPosition"),test_match:e(function(f,M){var D,b,j;if(this.options.backtrack_lexer){if(j={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges)j.yylloc.range=this.yylloc.range.slice(0)}if(b=f[0].match(/(?:\r\n?|\n).*/g),b)this.yylineno+=b.length;if(this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:b?b[b.length-1].length-b[b.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+f[0].length},this.yytext+=f[0],this.match+=f[0],this.matches=f,this.yyleng=this.yytext.length,this.options.ranges)this.yylloc.range=[this.offset,this.offset+=this.yyleng];if(this._more=!1,this._backtrack=!1,this._input=this._input.slice(f[0].length),this.matched+=f[0],D=this.performAction.call(this,this.yy,this,M,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input)this.done=!1;if(D)return D;else if(this._backtrack){for(var s in j)this[s]=j[s];return!1}return!1},"test_match"),next:e(function(){if(this.done)return this.EOF;if(!this._input)this.done=!0;var f,M,D,b;if(!this._more)this.yytext="",this.match="";var j=this._currentRules();for(var s=0;s<j.length;s++)if(D=this._input.match(this.rules[j[s]]),D&&(!M||D[0].length>M[0].length)){if(M=D,b=s,this.options.backtrack_lexer)if(f=this.test_match(D,j[s]),f!==!1)return f;else if(this._backtrack){M=!1;continue}else return!1;else if(!this.options.flex)break}if(M){if(f=this.test_match(M,j[b]),f!==!1)return f;return!1}if(this._input==="")return this.EOF;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:e(function(){var M=this.next();if(M)return M;else return this.lex()},"lex"),begin:e(function(M){this.conditionStack.push(M)},"begin"),popState:e(function(){var M=this.conditionStack.length-1;if(M>0)return this.conditionStack.pop();else return this.conditionStack[0]},"popState"),_currentRules:e(function(){if(this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1])return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;else return this.conditions.INITIAL.rules},"_currentRules"),topState:e(function(M){if(M=this.conditionStack.length-1-Math.abs(M||0),M>=0)return this.conditionStack[M];else return"INITIAL"},"topState"),pushState:e(function(M){this.begin(M)},"pushState"),stateStackSize:e(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:e(function(M,D,b,j){var s=j;switch(b){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),31;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),33;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return L}();C.lexer=A;function I(){this.yy={}}return e(I,"Parser"),I.prototype=C,C.Parser=I,new I}();ce.parser=ce;var si=ce;ut.default.extend(Oe.default);ut.default.extend(We.default);ut.default.extend(Ve.default);var $e={friday:5,saturday:6},kt="",he="",me=void 0,ke="",Yt=[],$t=[],ye=new Map,ge=[],Gt=[],At="",pe="",Pe=["active","done","crit","milestone","vert"],ve=[],St="",Ft=!1,Te=!1,be="sunday",Xt="saturday",ue=0,ai=e(function(){ge=[],Gt=[],At="",ve=[],Rt=0,fe=void 0,jt=void 0,ct=[],kt="",he="",pe="",me=void 0,ke="",Yt=[],$t=[],Ft=!1,Te=!1,ue=0,ye=new Map,St="",d(),be="sunday",Xt="saturday"},"clear"),oi=e(function(i){St=i},"setDiagramId"),ci=e(function(i){he=i},"setAxisFormat"),li=e(function(){return he},"getAxisFormat"),ui=e(function(i){me=i},"setTickInterval"),di=e(function(){return me},"getTickInterval"),mi=e(function(i){ke=i},"setTodayMarker"),ki=e(function(){return ke},"getTodayMarker"),yi=e(function(i){kt=i},"setDateFormat"),vi=e(function(){Ft=!0},"enableInclusiveEndDates"),Ti=e(function(){return Ft},"endDatesAreInclusive"),bi=e(function(){Te=!0},"enableTopAxis"),xi=e(function(){return Te},"topAxisEnabled"),wi=e(function(i){pe=i},"setDisplayMode"),_i=e(function(){return pe},"getDisplayMode"),Di=e(function(){return kt},"getDateFormat"),ze=e((i,n)=>{let c=n.toLowerCase().split(/[\s,]+/).filter((o)=>o!=="");return[...new Set([...i,...c])]},"mergeTokens"),Si=e(function(i){Yt=ze(Yt,i)},"setIncludes"),Ci=e(function(){return Yt},"getIncludes"),Mi=e(function(i){$t=ze($t,i)},"setExcludes"),Ei=e(function(){return $t},"getExcludes"),Ii=e(function(){return ye},"getLinks"),Yi=e(function(i){At=i,ge.push(i)},"addSection"),$i=e(function(){return ge},"getSections"),Ai=e(function(){let i=Ae(),n=10,c=0;while(!i&&c<n)i=Ae(),c++;return Gt=ct,Gt},"getTasks"),Re=e(function(i,n,c,o){let u=i.format(n.trim()),x=i.format("YYYY-MM-DD");if(o.includes(u)||o.includes(x))return!1;if(c.includes("weekends")&&(i.isoWeekday()===$e[Xt]||i.isoWeekday()===$e[Xt]+1))return!0;if(c.includes(i.format("dddd").toLowerCase()))return!0;return c.includes(u)||c.includes(x)},"isInvalidDate"),Li=e(function(i){be=i},"setWeekday"),Fi=e(function(){return be},"getWeekday"),Oi=e(function(i){Xt=i},"setWeekend"),Ne=e(function(i,n,c,o){if(!c.length||i.manualEndTime)return;let u;if(i.startTime instanceof Date)u=ut.default(i.startTime);else u=ut.default(i.startTime,n,!0);u=u.add(1,"d");let x;if(i.endTime instanceof Date)x=ut.default(i.endTime);else x=ut.default(i.endTime,n,!0);let[E,P]=Wi(u,x,n,c,o);i.endTime=E.toDate(),i.renderEndTime=P},"checkTaskDates"),Wi=e(function(i,n,c,o,u){let x=!1,E=null,P=n.add(1e4,"d");while(i<=n){if(!x)E=n.toDate();if(x=Re(i,c,o,u),x){if(n=n.add(1,"d"),n>P)throw Error("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.")}i=i.add(1,"d")}return[n,E]},"fixTaskDates"),Be=e(function(i,n){t.warn(`Gantt: the "${i}" statement references unknown task id(s): ${n.join(", ")}. Make sure the referenced tasks exist and declare an id. Milestones need both an id and a duration, e.g. "Milestone :milestone, m1, 2023-01-01, 0d".`)},"warnAboutUnknownTaskIds"),de=e(function(i,n,c){if(c=c.trim(),e((P)=>{let W=P.trim();return W==="x"||W==="X"},"isTimestampFormat")(n)&&/^\d+$/.test(c))return new Date(Number(c));let x=/^after\s+(?<ids>[\d\w- ]+)/.exec(c);if(x!==null){let P=null,W=[],K=x.groups.ids.split(" ").filter((et)=>et!=="");for(let et of K){let z=bt(et);if(z===void 0){W.push(et);continue}if(!P||z.endTime>P.endTime)P=z}if(W.length>0)Be("after",W);if(P)return P.endTime;let B=new Date;return B.setHours(0,0,0,0),B}let E=ut.default(c,n.trim(),!0);if(E.isValid())return E.toDate();else{t.debug("Invalid date:"+c),t.debug("With date format:"+n.trim());let P=new Date(c);if(P===void 0||isNaN(P.getTime())||P.getFullYear()<-1e4||P.getFullYear()>1e4)throw Error("Invalid date:"+c);return P}},"getStartDate"),je=e(function(i){let n=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(i.trim());if(n!==null)return[Number.parseFloat(n[1]),n[2]];return[NaN,"ms"]},"parseDuration"),Ge=e(function(i,n,c,o=!1){c=c.trim();let x=/^until\s+(?<ids>[\d\w- ]+)/.exec(c);if(x!==null){let B=null,et=[],z=x.groups.ids.split(" ").filter((F)=>F!=="");for(let F of z){let V=bt(F);if(V===void 0){et.push(F);continue}if(!B||V.startTime<B.startTime)B=V}if(et.length>0)Be("until",et);if(B)return B.startTime;let R=new Date;return R.setHours(0,0,0,0),R}let E=ut.default(c,n.trim(),!0);if(E.isValid()){if(o)E=E.add(1,"d");return E.toDate()}let P=ut.default(i),[W,K]=je(c);if(Number.isNaN(W))t.warn(`Gantt: "${c}" is neither a valid date for the "${n.trim()}" date format nor a valid duration (e.g. "3d"), so it is ignored and the task gets a zero duration. Milestones need a duration too, e.g. "Milestone :milestone, m1, 2023-01-01, 0d".`);else{let B=P.add(W,K);if(B.isValid())P=B}return P.toDate()},"getEndDate"),Rt=0,Et=e(function(i){if(i===void 0)return Rt=Rt+1,"task"+Rt;return i},"parseId"),Vi=e(function(i,n){let c;if(n.substr(0,1)===":")c=n.substr(1,n.length);else c=n;let o=c.split(","),u={};xe(o,u,Pe);for(let E=0;E<o.length;E++)o[E]=o[E].trim();let x="";switch(o.length){case 1:u.id=Et(),u.startTime=i.endTime,x=o[0];break;case 2:u.id=Et(),u.startTime=de(void 0,kt,o[0]),x=o[1];break;case 3:u.id=Et(o[0]),u.startTime=de(void 0,kt,o[1]),x=o[2];break;default:}if(x)u.endTime=Ge(u.startTime,kt,x,Ft),u.manualEndTime=ut.default(x,"YYYY-MM-DD",!0).isValid(),Ne(u,kt,$t,Yt);return u},"compileData"),Pi=e(function(i,n){let c;if(n.substr(0,1)===":")c=n.substr(1,n.length);else c=n;let o=c.split(","),u={};xe(o,u,Pe);for(let x=0;x<o.length;x++)o[x]=o[x].trim();switch(o.length){case 1:u.id=Et(),u.startTime={type:"prevTaskEnd",id:i},u.endTime={data:o[0]};break;case 2:u.id=Et(),u.startTime={type:"getStartDate",startData:o[0]},u.endTime={data:o[1]};break;case 3:u.id=Et(o[0]),u.startTime={type:"getStartDate",startData:o[1]},u.endTime={data:o[2]};break;default:}return u},"parseData"),fe,jt,ct=[],qe={},zi=e(function(i,n){let c={section:At,type:At,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:n},task:i,classes:[]},o=Pi(jt,n);if(c.raw.startTime=o.startTime,c.raw.endTime=o.endTime,c.id=o.id,c.prevTaskId=jt,c.active=o.active,c.done=o.done,c.crit=o.crit,c.milestone=o.milestone,c.vert=o.vert,c.vert)c.order=-1;else c.order=ue,ue++;let u=ct.push(c);jt=c.id,qe[c.id]=u-1},"addTask"),bt=e(function(i){let n=qe[i];return ct[n]},"findTaskById"),Ri=e(function(i,n){let c={section:At,type:At,description:i,task:i,classes:[]},o=Vi(fe,n);c.startTime=o.startTime,c.endTime=o.endTime,c.id=o.id,c.active=o.active,c.done=o.done,c.crit=o.crit,c.milestone=o.milestone,c.vert=o.vert,fe=c,Gt.push(c)},"addTaskOrg"),Ae=e(function(){let i=e(function(c){let o=ct[c],u="";switch(ct[c].raw.startTime.type){case"prevTaskEnd":{let x=bt(o.prevTaskId);o.startTime=x.endTime;break}case"getStartDate":if(u=de(void 0,kt,ct[c].raw.startTime.startData),u)ct[c].startTime=u;break}if(ct[c].startTime){if(ct[c].endTime=Ge(ct[c].startTime,kt,ct[c].raw.endTime.data,Ft),ct[c].endTime)ct[c].processed=!0,ct[c].manualEndTime=ut.default(ct[c].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Ne(ct[c],kt,$t,Yt)}return ct[c].processed},"compileTask"),n=!0;for(let[c,o]of ct.entries())i(c),n=n&&o.processed;return n},"compileTasks"),Ni=e(function(i,n){let c=n;if(r().securityLevel!=="loose")c=Fe.sanitizeUrl(n);i.split(",").forEach(function(o){if(bt(o)!==void 0)Qe(o,()=>{window.open(c,"_self")}),ye.set(o,c)}),Ze(i,"clickable")},"setLink"),Ze=e(function(i,n){i.split(",").forEach(function(c){let o=bt(c);if(o!==void 0)o.classes.push(n)})},"setClass"),Hi=e(function(i,n,c){if(r().securityLevel!=="loose")return;if(n===void 0)return;let o=[];if(typeof c==="string"){o=c.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let x=0;x<o.length;x++){let E=o[x].trim();if(E.startsWith('"')&&E.endsWith('"'))E=E.substr(1,E.length-2);o[x]=E}}if(o.length===0)o.push(i);if(bt(i)!==void 0)Qe(i,()=>{T.runFunc(n,...o)})},"setClickFun"),Qe=e(function(i,n){ve.push(function(){let c=St?`${St}-${i}`:i,o=document.querySelector(`[id="${c}"]`);if(o!==null)o.addEventListener("click",function(){n()})},function(){let c=St?`${St}-${i}`:i,o=document.querySelector(`[id="${c}-text"]`);if(o!==null)o.addEventListener("click",function(){n()})})},"pushFun"),Bi=e(function(i,n,c){i.split(",").forEach(function(o){Hi(o,n,c)}),Ze(i,"clickable")},"setClickEvent"),ji=e(function(i){ve.forEach(function(n){n(i)})},"bindFunctions"),Gi={getConfig:e(()=>r().gantt,"getConfig"),clear:ai,setDateFormat:yi,getDateFormat:Di,enableInclusiveEndDates:vi,endDatesAreInclusive:Ti,enableTopAxis:bi,topAxisEnabled:xi,setAxisFormat:ci,getAxisFormat:li,setTickInterval:ui,getTickInterval:di,setTodayMarker:mi,getTodayMarker:ki,setAccTitle:p,getAccTitle:m,setDiagramTitle:w,getDiagramTitle:v,setDiagramId:oi,setDisplayMode:wi,getDisplayMode:_i,setAccDescription:g,getAccDescription:y,addSection:Yi,getSections:$i,getTasks:Ai,addTask:zi,findTaskById:bt,addTaskOrg:Ri,setIncludes:Si,getIncludes:Ci,setExcludes:Mi,getExcludes:Ei,setClickEvent:Bi,setLink:Ni,getLinks:Ii,bindFunctions:ji,parseDuration:je,isInvalidDate:Re,setWeekday:Li,getWeekday:Fi,setWeekend:Oi};function xe(i,n,c){let o=!0;while(o)o=!1,c.forEach(function(u){let x="^\\s*"+u+"\\s*$",E=new RegExp(x);if(i[0].match(E))n[u]=!0,i.shift(1),o=!0})}e(xe,"getTaskTags");Ct.default.extend(Ke.default);var Xi=e(function(){t.debug("Something is calling, setConf, remove the call")},"setConf"),Le={monday:Ot,tuesday:Ln,wednesday:Mn,thursday:ht,friday:In,saturday:On,sunday:mt},Ui=e((i,n)=>{let c=[...i].map(()=>-1/0),o=[...i].sort((x,E)=>x.startTime-E.startTime||x.order-E.order),u=0;for(let x of o)for(let E=0;E<c.length;E++)if(x.startTime>=c[E]){if(c[E]=x.endTime,x.order=E+n,E>u)u=E;break}return u},"getMaxIntersections"),vt,oe=1e4,qi=e(function(i,n,c,o){let u=r().gantt;o.db.setDiagramId(n);let x=r().securityLevel,E;if(x==="sandbox")E=a("#i"+n);let P=x==="sandbox"?a(E.nodes()[0].contentDocument.body):a("body"),W=x==="sandbox"?E.nodes()[0].contentDocument:document,K=W.getElementById(n);if(vt=K.parentElement.offsetWidth,vt===void 0)vt=1200;if(u.useWidth!==void 0)vt=u.useWidth;let B=o.db.getTasks(),et=B.filter((C)=>!C.vert),z=[];for(let C of et)z.push(C.type);z=q(z);let R={},F=2*u.topPadding;if(o.db.getDisplayMode()==="compact"||u.displayMode==="compact"){let C={};for(let I of et)if(C[I.section]===void 0)C[I.section]=[I];else C[I.section].push(I);let A=0;for(let I of Object.keys(C)){let L=Ui(C[I],A)+1;A+=L,F+=L*(u.barHeight+u.barGap),R[I]=L}}else{F+=et.length*(u.barHeight+u.barGap);for(let C of z)R[C]=et.filter((A)=>A.type===C).length}K.setAttribute("viewBox","0 0 "+vt+" "+F);let V=P.select(`[id="${n}"]`),O=gi().domain([fi(B,function(C){return C.startTime}),hi(B,function(C){return C.endTime})]).rangeRound([0,vt-u.leftPadding-u.rightPadding]);function Z(C,A){let I=C.startTime,L=A.startTime,f=0;if(I>L)f=1;else if(I<L)f=-1;return f}e(Z,"taskCompare"),B.sort(Z),rt(B,vt,F),S(V,F,vt,u.useMaxWidth),V.append("text").text(o.db.getDiagramTitle()).attr("x",vt/2).attr("y",u.titleTopMargin).attr("class","titleText");function rt(C,A,I){let L=u.barHeight,f=L+u.barGap,{topPadding:M,leftPadding:D}=u,b=He().domain([0,z.length]).range(["#00B9FA","#F95002"]).interpolate(pi);U(f,M,D,A,I,C,o.db.getExcludes(),o.db.getIncludes()),_(D,M,A,I),st(C,f,M,D,L,b,A,I),N(f,M,D,L,b),Q(D,M,A,I)}e(rt,"makeGantt");function st(C,A,I,L,f,M,D){C.sort((h,H)=>h.vert===H.vert?0:h.vert?1:-1);let b=C.filter((h)=>!h.vert),s=[...new Set(b.map((h)=>h.order))].map((h)=>b.find((H)=>H.order===h));V.append("g").selectAll("rect").data(s).enter().append("rect").attr("x",0).attr("y",function(h,H){return H=h.order,H*A+I-2}).attr("width",function(){return D-u.rightPadding/2}).attr("height",A).attr("class",function(h){for(let[H,X]of z.entries())if(h.type===X)return"section section"+H%u.numberSectionStyles;return"section section0"}).enter();let G=V.append("g").selectAll("rect").data(C).enter(),k=o.db.getLinks();if(G.append("rect").attr("id",function(h){return n+"-"+h.id}).attr("rx",3).attr("ry",3).attr("x",function(h){if(h.milestone)return O(h.startTime)+L+0.5*(O(h.endTime)-O(h.startTime))-0.5*f;return O(h.startTime)+L}).attr("y",function(h,H){if(H=h.order,h.vert)return u.gridLineStartPadding;return H*A+I}).attr("width",function(h){if(h.milestone)return f;if(h.vert)return 0.08*f;return O(h.renderEndTime||h.endTime)-O(h.startTime)}).attr("height",function(h){if(h.vert)return b.length*(u.barHeight+u.barGap)+u.barHeight*2;return f}).attr("transform-origin",function(h,H){return H=h.order,(O(h.startTime)+L+0.5*(O(h.endTime)-O(h.startTime))).toString()+"px "+(H*A+I+0.5*f).toString()+"px"}).attr("class",function(h){let X="";if(h.classes.length>0)X=h.classes.join(" ");let it=0;for(let[J,tt]of z.entries())if(h.type===tt)it=J%u.numberSectionStyles;let nt="";if(h.active)if(h.crit)nt+=" activeCrit";else nt=" active";else if(h.done)if(h.crit)nt=" doneCrit";else nt=" done";else if(h.crit)nt+=" crit";if(nt.length===0)nt=" task";if(h.milestone)nt=" milestone "+nt;if(h.vert)nt=" vert "+nt;return nt+=it,nt+=" "+X,"task"+nt}),G.append("text").attr("id",function(h){return n+"-"+h.id+"-text"}).text(function(h){return h.task}).attr("font-size",u.fontSize).attr("x",function(h){let H=O(h.startTime),X=O(h.renderEndTime||h.endTime);if(h.milestone)H+=0.5*(O(h.endTime)-O(h.startTime))-0.5*f,X=H+f;if(h.vert)return O(h.startTime)+L;let it=this.getBBox().width;if(it>X-H)if(X+it+1.5*u.leftPadding>D)return H+L-5;else return X+L+5;else return(X-H)/2+H+L}).attr("y",function(h,H){if(h.vert)return u.gridLineStartPadding+b.length*(u.barHeight+u.barGap)+60;return H=h.order,H*A+u.barHeight/2+(u.fontSize/2-2)+I}).attr("text-height",f).attr("class",function(h){let H=O(h.startTime),X=O(h.endTime);if(h.milestone)X=H+f;let it=this.getBBox().width,nt="";if(h.classes.length>0)nt=h.classes.join(" ");let J=0;for(let[yt,gt]of z.entries())if(h.type===gt)J=yt%u.numberSectionStyles;let tt="";if(h.active)if(h.crit)tt="activeCritText"+J;else tt="activeText"+J;if(h.done)if(h.crit)tt=tt+" doneCritText"+J;else tt=tt+" doneText"+J;else if(h.crit)tt=tt+" critText"+J;if(h.milestone)tt+=" milestoneText";if(h.vert)tt+=" vertText";if(it>X-H)if(X+it+1.5*u.leftPadding>D)return nt+" taskTextOutsideLeft taskTextOutside"+J+" "+tt;else return nt+" taskTextOutsideRight taskTextOutside"+J+" "+tt+" width-"+it;else return nt+" taskText taskText"+J+" "+tt+" width-"+it}),r().securityLevel==="sandbox"){let h;h=a("#i"+n);let H=h.nodes()[0].contentDocument;G.filter(function(X){return k.has(X.id)}).each(function(X){var it=H.querySelector("#"+CSS.escape(n+"-"+X.id)),nt=H.querySelector("#"+CSS.escape(n+"-"+X.id+"-text"));let J=it.parentNode;var tt=H.createElement("a");tt.setAttribute("xlink:href",k.get(X.id)),tt.setAttribute("target","_top"),J.appendChild(tt),tt.appendChild(it),tt.appendChild(nt)})}}e(st,"drawRects");function U(C,A,I,L,f,M,D,b){if(D.length===0&&b.length===0)return;let j,s;for(let{startTime:X,endTime:it}of M){if(j===void 0||X<j)j=X;if(s===void 0||it>s)s=it}if(!j||!s)return;if(Ct.default(s).diff(Ct.default(j),"year")>5){t.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}let G=o.db.getDateFormat(),k=[],at=null,h=Ct.default(j);while(h.valueOf()<=s){if(o.db.isInvalidDate(h,G,D,b))if(!at)at={start:h,end:h};else at.end=h;else if(at)k.push(at),at=null;h=h.add(1,"d")}V.append("g").selectAll("rect").data(k).enter().append("rect").attr("id",(X)=>n+"-exclude-"+X.start.format("YYYY-MM-DD")).attr("x",(X)=>O(X.start.startOf("day"))+I).attr("y",u.gridLineStartPadding).attr("width",(X)=>O(X.end.endOf("day"))-O(X.start.startOf("day"))).attr("height",f-A-u.gridLineStartPadding).attr("transform-origin",function(X,it){return(O(X.start)+I+0.5*(O(X.end)-O(X.start))).toString()+"px "+(it*C+0.5*f).toString()+"px"}).attr("class","exclude-range")}e(U,"drawExcludeDays");function Y(C,A,I,L){if(I<=0||C>A)return 1/0;let f=A-C,M=Ct.default.duration({[L??"day"]:I}).asMilliseconds();if(M<=0)return 1/0;return Math.ceil(f/M)}e(Y,"getEstimatedTickCount");function _(C,A,I,L){let f=o.db.getDateFormat(),M=o.db.getAxisFormat(),D;if(M)D=M;else if(f==="D")D="%d";else D=u.axisFormat??"%Y-%m-%d";let b=Ce(O).tickSize(-L+A+u.gridLineStartPadding).tickFormat(Ht(D)),s=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(o.db.getTickInterval()||u.tickInterval);if(s!==null){let G=parseInt(s[1],10);if(isNaN(G)||G<=0)t.warn(`Invalid tick interval value: "${s[1]}". Skipping custom tick interval.`);else{let k=s[2],at=o.db.getWeekday()||u.weekday,h=O.domain(),H=h[0],X=h[1],it=Y(H,X,G,k);if(it>oe)t.warn(`The tick interval "${G}${k}" would generate ${it} ticks, which exceeds the maximum allowed (${oe}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(k){case"millisecond":b.ticks(Lt.every(G));break;case"second":b.ticks(Ue.every(G));break;case"minute":b.ticks(Mt.every(G));break;case"hour":b.ticks(It.every(G));break;case"day":b.ticks(Xe.every(G));break;case"week":b.ticks(Le[at].every(G));break;case"month":b.ticks(Nt.every(G));break}}}if(V.append("g").attr("class","grid").attr("transform","translate("+C+", "+(L-50)+")").call(b).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),o.db.topAxisEnabled()||u.topAxis){let G=Se(O).tickSize(-L+A+u.gridLineStartPadding).tickFormat(Ht(D));if(s!==null){let k=parseInt(s[1],10);if(isNaN(k)||k<=0)t.warn(`Invalid tick interval value: "${s[1]}". Skipping custom tick interval.`);else{let at=s[2],h=o.db.getWeekday()||u.weekday,H=O.domain(),X=H[0],it=H[1];if(Y(X,it,k,at)<=oe)switch(at){case"millisecond":G.ticks(Lt.every(k));break;case"second":G.ticks(Ue.every(k));break;case"minute":G.ticks(Mt.every(k));break;case"hour":G.ticks(It.every(k));break;case"day":G.ticks(Xe.every(k));break;case"week":G.ticks(Le[h].every(k));break;case"month":G.ticks(Nt.every(k));break}}}V.append("g").attr("class","grid").attr("transform","translate("+C+", "+A+")").call(G).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}e(_,"makeGrid");function N(C,A){let I=0,L=Object.keys(R).map((f)=>[f,R[f]]);V.append("g").selectAll("text").data(L).enter().append(function(f){let M=f[0].split(l.lineBreakRegex),D=-(M.length-1)/2,b=W.createElementNS("http://www.w3.org/2000/svg","text");b.setAttribute("dy",D+"em");for(let[j,s]of M.entries()){let G=W.createElementNS("http://www.w3.org/2000/svg","tspan");if(G.setAttribute("alignment-baseline","central"),G.setAttribute("x","10"),j>0)G.setAttribute("dy","1em");G.textContent=s,b.appendChild(G)}return b}).attr("x",10).attr("y",function(f,M){if(M>0)for(let D=0;D<M;D++)return I+=L[M-1][1],f[1]*C/2+I*C+A;else return f[1]*C/2+A}).attr("font-size",u.sectionFontSize).attr("class",function(f){for(let[M,D]of z.entries())if(f[0]===D)return"sectionTitle sectionTitle"+M%u.numberSectionStyles;return"sectionTitle"})}e(N,"vertLabels");function Q(C,A,I,L){let f=o.db.getTodayMarker();if(f==="off")return;let M=V.append("g").attr("class","today"),D=new Date,b=M.append("line");if(b.attr("x1",O(D)+C).attr("x2",O(D)+C).attr("y1",u.titleTopMargin).attr("y2",L-u.titleTopMargin).attr("class","today"),f!=="")b.attr("style",f.replace(/,/g,";"))}e(Q,"drawToday");function q(C){let A={},I=[];for(let L=0,f=C.length;L<f;++L)if(!Object.prototype.hasOwnProperty.call(A,C[L]))A[C[L]]=!0,I.push(C[L]);return I}e(q,"checkUnique")},"draw"),Zi={setConf:Xi,draw:qi},Qi=e((i)=>`
  .mermaid-main-font {
        font-family: ${i.fontFamily};
  }

  .exclude-range {
    fill: ${i.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${i.sectionBkgColor};
  }

  .section2 {
    fill: ${i.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${i.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${i.titleColor};
  }

  .sectionTitle1 {
    fill: ${i.titleColor};
  }

  .sectionTitle2 {
    fill: ${i.titleColor};
  }

  .sectionTitle3 {
    fill: ${i.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${i.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${i.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${i.fontFamily};
    fill: ${i.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${i.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${i.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${i.taskTextDarkColor};
    text-anchor: start;
    font-family: ${i.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${i.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${i.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${i.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${i.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${i.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${i.taskBkgColor};
    stroke: ${i.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${i.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${i.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${i.activeTaskBkgColor};
    stroke: ${i.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${i.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${i.doneTaskBorderColor};
    fill: ${i.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${i.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${i.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${i.critBorderColor};
    fill: ${i.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${i.critBorderColor};
    fill: ${i.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${i.critBorderColor};
    fill: ${i.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${i.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar — same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${i.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${i.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${i.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${i.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${i.titleColor||i.textColor};
    font-family: ${i.fontFamily};
  }
`,"getStyles"),Ki=Qi,on={parser:si,db:Gi,renderer:Zi,styles:Ki};export{on as diagram};
