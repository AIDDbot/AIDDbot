import{e,S,d,p,m,g,y,w,v,r,a,We}from"./main-r27nhh20.js";import{ft,pr,mi,me}from"./main-06f3ech2.js";import{ce}from"./main-vjw4aqd9.js";var nt=function(){var t=e(function(f,s,l,c){for(l=l||{},c=f.length;c--;l[f[c]]=s);return l},"o"),i=[6,8,10,11,12,14,16,17,18],o=[1,9],_=[1,10],n=[1,11],x=[1,12],T=[1,13],h=[1,14],M={trace:e(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:e(function(s,l,c,k,b,u,A){var P=u.length-1;switch(b){case 1:return u[P-1];case 2:this.$=[];break;case 3:u[P-1].push(u[P]),this.$=u[P-1];break;case 4:case 5:this.$=u[P];break;case 6:case 7:this.$=[];break;case 8:k.setDiagramTitle(u[P].substr(6)),this.$=u[P].substr(6);break;case 9:this.$=u[P].trim(),k.setAccTitle(this.$);break;case 10:case 11:this.$=u[P].trim(),k.setAccDescription(this.$);break;case 12:k.addSection(u[P].substr(8)),this.$=u[P].substr(8);break;case 13:k.addTask(u[P-1],u[P]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(i,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:o,12:_,14:n,16:x,17:T,18:h},t(i,[2,7],{1:[2,1]}),t(i,[2,3]),{9:15,11:o,12:_,14:n,16:x,17:T,18:h},t(i,[2,5]),t(i,[2,6]),t(i,[2,8]),{13:[1,16]},{15:[1,17]},t(i,[2,11]),t(i,[2,12]),{19:[1,18]},t(i,[2,4]),t(i,[2,9]),t(i,[2,10]),t(i,[2,13])],defaultActions:{},parseError:e(function(s,l){if(l.recoverable)this.trace(s);else{var c=Error(s);throw c.hash=l,c}},"parseError"),parse:e(function(s){var l=this,c=[0],k=[],b=[null],u=[],A=this.table,P="",z=0,ot=0,ct=0,vt=2,ht=1,wt=u.slice.call(arguments,1),I=Object.create(this.lexer),O={yy:{}};for(var Q in this.yy)if(Object.prototype.hasOwnProperty.call(this.yy,Q))O.yy[Q]=this.yy[Q];if(I.setInput(s,O.yy),O.yy.lexer=I,O.yy.parser=this,typeof I.yylloc>"u")I.yylloc={};var D=I.yylloc;u.push(D);var Tt=I.options&&I.options.ranges;if(typeof O.yy.parseError==="function")this.parseError=O.yy.parseError;else this.parseError=Object.getPrototypeOf(this).parseError;function St(R){c.length=c.length-2*R,b.length=b.length-R,u.length=u.length-R}e(St,"popStack");function ut(){var R=k.pop()||I.lex()||ht;if(typeof R!=="number"){if(R instanceof Array)k=R,R=k.pop();R=l.symbols_[R]||R}return R}e(ut,"lex");var F,tt,Y,V,Gt,et,q={},Z,j,yt,J;while(!0){if(Y=c[c.length-1],this.defaultActions[Y])V=this.defaultActions[Y];else{if(F===null||typeof F>"u")F=ut();V=A[Y]&&A[Y][F]}if(typeof V>"u"||!V.length||!V[0]){var rt="";J=[];for(Z in A[Y])if(this.terminals_[Z]&&Z>vt)J.push("'"+this.terminals_[Z]+"'");if(I.showPosition)rt="Parse error on line "+(z+1)+`:
`+I.showPosition()+`
Expecting `+J.join(", ")+", got '"+(this.terminals_[F]||F)+"'";else rt="Parse error on line "+(z+1)+": Unexpected "+(F==ht?"end of input":"'"+(this.terminals_[F]||F)+"'");this.parseError(rt,{text:I.match,token:this.terminals_[F]||F,line:I.yylineno,loc:D,expected:J})}if(V[0]instanceof Array&&V.length>1)throw Error("Parse Error: multiple actions possible at state: "+Y+", token: "+F);switch(V[0]){case 1:if(c.push(F),b.push(I.yytext),u.push(I.yylloc),c.push(V[1]),F=null,!tt){if(ot=I.yyleng,P=I.yytext,z=I.yylineno,D=I.yylloc,ct>0)ct--}else F=tt,tt=null;break;case 2:if(j=this.productions_[V[1]][1],q.$=b[b.length-j],q._$={first_line:u[u.length-(j||1)].first_line,last_line:u[u.length-1].last_line,first_column:u[u.length-(j||1)].first_column,last_column:u[u.length-1].last_column},Tt)q._$.range=[u[u.length-(j||1)].range[0],u[u.length-1].range[1]];if(et=this.performAction.apply(q,[P,ot,z,O.yy,V[1],b,u].concat(wt)),typeof et<"u")return et;if(j)c=c.slice(0,-1*j*2),b=b.slice(0,-1*j),u=u.slice(0,-1*j);c.push(this.productions_[V[1]][0]),b.push(q.$),u.push(q._$),yt=A[c[c.length-2]][c[c.length-1]],c.push(yt);break;case 3:return!0}}return!0},"parse")},E=function(){var f={EOF:1,parseError:e(function(l,c){if(this.yy.parser)this.yy.parser.parseError(l,c);else throw Error(l)},"parseError"),setInput:e(function(s,l){if(this.yy=l||this.yy||{},this._input=s,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges)this.yylloc.range=[0,0];return this.offset=0,this},"setInput"),input:e(function(){var s=this._input[0];this.yytext+=s,this.yyleng++,this.offset++,this.match+=s,this.matched+=s;var l=s.match(/(?:\r\n?|\n).*/g);if(l)this.yylineno++,this.yylloc.last_line++;else this.yylloc.last_column++;if(this.options.ranges)this.yylloc.range[1]++;return this._input=this._input.slice(1),s},"input"),unput:e(function(s){var l=s.length,c=s.split(/(?:\r\n?|\n)/g);this._input=s+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var k=this.match.split(/(?:\r\n?|\n)/g);if(this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1)this.yylineno-=c.length-1;var b=this.yylloc.range;if(this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===k.length?this.yylloc.first_column:0)+k[k.length-c.length].length-c[0].length:this.yylloc.first_column-l},this.options.ranges)this.yylloc.range=[b[0],b[0]+this.yyleng-l];return this.yyleng=this.yytext.length,this},"unput"),more:e(function(){return this._more=!0,this},"more"),reject:e(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:e(function(s){this.unput(this.match.slice(s))},"less"),pastInput:e(function(){var s=this.matched.substr(0,this.matched.length-this.match.length);return(s.length>20?"...":"")+s.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:e(function(){var s=this.match;if(s.length<20)s+=this._input.substr(0,20-s.length);return(s.substr(0,20)+(s.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:e(function(){var s=this.pastInput(),l=Array(s.length+1).join("-");return s+this.upcomingInput()+`
`+l+"^"},"showPosition"),test_match:e(function(s,l){var c,k,b;if(this.options.backtrack_lexer){if(b={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges)b.yylloc.range=this.yylloc.range.slice(0)}if(k=s[0].match(/(?:\r\n?|\n).*/g),k)this.yylineno+=k.length;if(this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:k?k[k.length-1].length-k[k.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges)this.yylloc.range=[this.offset,this.offset+=this.yyleng];if(this._more=!1,this._backtrack=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],c=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input)this.done=!1;if(c)return c;else if(this._backtrack){for(var u in b)this[u]=b[u];return!1}return!1},"test_match"),next:e(function(){if(this.done)return this.EOF;if(!this._input)this.done=!0;var s,l,c,k;if(!this._more)this.yytext="",this.match="";var b=this._currentRules();for(var u=0;u<b.length;u++)if(c=this._input.match(this.rules[b[u]]),c&&(!l||c[0].length>l[0].length)){if(l=c,k=u,this.options.backtrack_lexer)if(s=this.test_match(c,b[u]),s!==!1)return s;else if(this._backtrack){l=!1;continue}else return!1;else if(!this.options.flex)break}if(l){if(s=this.test_match(l,b[k]),s!==!1)return s;return!1}if(this._input==="")return this.EOF;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:e(function(){var l=this.next();if(l)return l;else return this.lex()},"lex"),begin:e(function(l){this.conditionStack.push(l)},"begin"),popState:e(function(){var l=this.conditionStack.length-1;if(l>0)return this.conditionStack.pop();else return this.conditionStack[0]},"popState"),_currentRules:e(function(){if(this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1])return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;else return this.conditions.INITIAL.rules},"_currentRules"),topState:e(function(l){if(l=this.conditionStack.length-1-Math.abs(l||0),l>=0)return this.conditionStack[l];else return"INITIAL"},"topState"),pushState:e(function(l){this.begin(l)},"pushState"),stateStackSize:e(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:e(function(l,c,k,b){var u=b;switch(k){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;break;case 8:return this.popState(),"acc_title_value";break;case 9:return this.begin("acc_descr"),14;break;case 10:return this.popState(),"acc_descr_value";break;case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return f}();M.lexer=E;function C(){this.yy={}}return e(C,"Parser"),C.prototype=M,M.Parser=C,new C}();nt.parser=nt;var $t=nt,X="",at=[],G=[],H=[],Mt=e(function(){at.length=0,G.length=0,X="",H.length=0,d()},"clear"),Et=e(function(t){X=t,at.push(t)},"addSection"),Ct=e(function(){return at},"getSections"),Pt=e(function(){let t=dt(),i=100,o=0;while(!t&&o<i)t=dt(),o++;return G.push(...H),G},"getTasks"),It=e(function(){let t=[];return G.forEach((o)=>{if(o.people)t.push(...o.people)}),[...new Set(t)].sort()},"updateActors"),At=e(function(t,i){let o=i.substr(1).split(":"),_=0,n=[];if(o.length===1)_=Number(o[0]),n=[];else _=Number(o[0]),n=o[1].split(",");let x=n.map((h)=>h.trim()),T={section:X,type:X,people:x,task:t,score:_};H.push(T)},"addTask"),Ft=e(function(t){let i={section:X,type:X,description:t,task:t,classes:[]};G.push(i)},"addTaskOrg"),dt=e(function(){let t=e(function(o){return H[o].processed},"compileTask"),i=!0;for(let[o,_]of H.entries())t(o),i=i&&_.processed;return i},"compileTasks"),Vt=e(function(){return It()},"getActors"),pt={getConfig:e(()=>r().journey,"getConfig"),clear:Mt,setDiagramTitle:w,getDiagramTitle:v,setAccTitle:p,getAccTitle:m,setAccDescription:g,getAccDescription:y,addSection:Et,getSections:Ct,getTasks:Pt,addTask:At,addTaskOrg:Ft,getActors:Vt},Rt=e((t)=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePaths .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
  ${ce()}
`,"getStyles"),Lt=Rt,lt=e(function(t,i){return ft(t,i)},"drawRect"),Bt=e(function(t,i){let _=t.append("circle").attr("cx",i.cx).attr("cy",i.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),n=t.append("g");n.append("circle").attr("cx",i.cx-5).attr("cy",i.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),n.append("circle").attr("cx",i.cx+5).attr("cy",i.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function x(M){let E=We().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);M.append("path").attr("class","mouth").attr("d",E).attr("transform","translate("+i.cx+","+(i.cy+2)+")")}e(x,"smile");function T(M){let E=We().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);M.append("path").attr("class","mouth").attr("d",E).attr("transform","translate("+i.cx+","+(i.cy+7)+")")}e(T,"sad");function h(M){M.append("line").attr("class","mouth").attr("stroke",2).attr("x1",i.cx-5).attr("y1",i.cy+7).attr("x2",i.cx+5).attr("y2",i.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}if(e(h,"ambivalent"),i.score>3)x(n);else if(i.score<3)T(n);else h(n);return _},"drawFace"),xt=e(function(t,i){let o=t.append("circle");if(o.attr("cx",i.cx),o.attr("cy",i.cy),o.attr("class","actor-"+i.pos),o.attr("fill",i.fill),o.attr("stroke",i.stroke),o.attr("r",i.r),o.class!==void 0)o.attr("class",o.class);if(i.title!==void 0)o.append("title").text(i.title);return o},"drawCircle"),kt=e(function(t,i){return mi(t,i)},"drawText"),jt=e(function(t,i){function o(n,x,T,h,M){return n+","+x+" "+(n+T)+","+x+" "+(n+T)+","+(x+h-M)+" "+(n+T-M*1.2)+","+(x+h)+" "+n+","+(x+h)}e(o,"genPoints");let _=t.append("polygon");_.attr("points",o(i.x,i.y,50,20,7)),_.attr("class","labelBox"),i.y=i.y+i.labelMargin,i.x=i.x+0.5*i.labelMargin,kt(t,i)},"drawLabel"),Nt=e(function(t,i,o){let _=t.append("g"),n=me();n.x=i.x,n.y=i.y,n.fill=i.fill,n.width=o.width*i.taskCount+o.diagramMarginX*(i.taskCount-1),n.height=o.height,n.class="journey-section section-type-"+i.num,n.rx=3,n.ry=3,lt(_,n),bt(o)(i.text,_,n.x,n.y,n.width,n.height,{class:"journey-section section-type-"+i.num},o,i.colour)},"drawSection"),st=-1,zt=e(function(t,i,o,_){let n=i.x+o.width/2,x=t.append("g");st++;let T=450;x.append("line").attr("id",_+"-task"+st).attr("x1",n).attr("y1",i.y).attr("x2",n).attr("y2",T).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Bt(x,{cx:n,cy:300+(5-i.score)*30,score:i.score});let h=me();h.x=i.x,h.y=i.y,h.fill=i.fill,h.width=o.width,h.height=o.height,h.class="task task-type-"+i.num,h.rx=3,h.ry=3,lt(x,h);let M=i.x+14;i.people.forEach((E)=>{let C=i.actors[E].color,f={cx:M,cy:i.y,r:7,fill:C,stroke:"#000",title:E,pos:i.actors[E].position};xt(x,f),M+=10}),bt(o)(i.task,x,h.x,h.y,h.width,h.height,{class:"task"},o,i.colour)},"drawTask"),Wt=e(function(t,i){pr(t,i)},"drawBackgroundRect"),bt=function(){function t(n,x,T,h,M,E,C,f){let s=x.append("text").attr("x",T+M/2).attr("y",h+E/2+5).style("font-color",f).style("text-anchor","middle").text(n);_(s,C)}e(t,"byText");function i(n,x,T,h,M,E,C,f,s){let{taskFontSize:l,taskFontFamily:c}=f,k=n.split(/<br\s*\/?>/gi);for(let b=0;b<k.length;b++){let u=b*l-l*(k.length-1)/2,A=x.append("text").attr("x",T+M/2).attr("y",h).attr("fill",s).style("text-anchor","middle").style("font-size",l).style("font-family",c);A.append("tspan").attr("x",T+M/2).attr("dy",u).text(k[b]),A.attr("y",h+E/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),_(A,C)}}e(i,"byTspan");function o(n,x,T,h,M,E,C,f){let s=x.append("switch"),c=s.append("foreignObject").attr("x",T).attr("y",h).attr("width",M).attr("height",E).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");c.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(n),i(n,s,T,h,M,E,C,f),_(c,C)}e(o,"byFo");function _(n,x){for(let T in x)if(T in x)n.attr(T,x[T])}return e(_,"_setTextAttrs"),function(n){return n.textPlacement==="fo"?o:n.textPlacement==="old"?t:i}}(),Ot=e(function(t,i){st=-1,t.append("defs").append("marker").attr("id",i+"-arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),U={drawRect:lt,drawCircle:xt,drawSection:Nt,drawText:kt,drawLabel:jt,drawTask:zt,drawBackgroundRect:Wt,initGraphics:Ot},Yt=e(function(t){Object.keys(t).forEach(function(o){B[o]=t[o]})},"setConf"),N={},K=0;function _t(t){let i=r().journey,o=i.maxLabelWidth;K=0;let _=60;Object.keys(N).forEach((n)=>{let x=N[n].color,T={cx:20,cy:_,r:7,fill:x,stroke:"#000",pos:N[n].position};U.drawCircle(t,T);let h=t.append("text").attr("visibility","hidden").text(n),M=h.node().getBoundingClientRect().width;h.remove();let E=[];if(M<=o)E=[n];else{let C=n.split(" "),f="";if(h=t.append("text").attr("visibility","hidden"),C.forEach((s)=>{let l=f?`${f} ${s}`:s;if(h.text(l),h.node().getBoundingClientRect().width>o){if(f)E.push(f);if(f=s,h.text(s),h.node().getBoundingClientRect().width>o){let k="";for(let b of s)if(k+=b,h.text(k+"-"),h.node().getBoundingClientRect().width>o)E.push(k.slice(0,-1)+"-"),k=b;f=k}}else f=l}),f)E.push(f);h.remove()}E.forEach((C,f)=>{let s={x:40,y:_+7+f*20,fill:"#666",text:C,textMargin:i.boxTextMargin??5},c=U.drawText(t,s).node().getBoundingClientRect().width;if(c>K&&c>i.leftMargin-c)K=c}),_+=Math.max(20,E.length*20)})}e(_t,"drawActorLegend");var B=r().journey,W=0,qt=e(function(t,i,o,_){let n=r(),x=n.journey.titleColor,T=n.journey.titleFontSize,h=n.journey.titleFontFamily,M=n.securityLevel,E;if(M==="sandbox")E=a("#i"+i);let C=M==="sandbox"?a(E.nodes()[0].contentDocument.body):a("body");L.init();let f=C.select("#"+i);U.initGraphics(f,i);let s=_.db.getTasks(),l=_.db.getDiagramTitle(),c=_.db.getActors();for(let z in N)delete N[z];let k=0;c.forEach((z)=>{N[z]={color:B.actorColours[k%B.actorColours.length],position:k},k++}),_t(f),W=B.leftMargin+K,L.insert(0,0,W,Object.keys(N).length*50),Xt(f,s,0,i);let b=L.getBounds();if(l)f.append("text").text(l).attr("x",W).attr("font-size",T).attr("font-weight","bold").attr("y",25).attr("fill",x).attr("font-family",h);let u=b.stopy-b.starty+2*B.diagramMarginY,A=W+b.stopx+2*B.diagramMarginX;S(f,u,A,B.useMaxWidth),f.append("line").attr("x1",W).attr("y1",B.height*4).attr("x2",A-W-4).attr("y2",B.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#"+i+"-arrowhead)");let P=l?70:0;f.attr("viewBox",`${b.startx} -25 ${A} ${u+P}`),f.attr("preserveAspectRatio","xMinYMin meet"),f.attr("height",u+P+25)},"draw"),L={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:e(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:e(function(t,i,o,_){if(t[i]===void 0)t[i]=o;else t[i]=_(o,t[i])},"updateVal"),updateBounds:e(function(t,i,o,_){let n=r().journey,x=this,T=0;function h(M){return e(function(C){T++;let f=x.sequenceItems.length-T+1;if(x.updateVal(C,"starty",i-f*n.boxMargin,Math.min),x.updateVal(C,"stopy",_+f*n.boxMargin,Math.max),x.updateVal(L.data,"startx",t-f*n.boxMargin,Math.min),x.updateVal(L.data,"stopx",o+f*n.boxMargin,Math.max),M!=="activation")x.updateVal(C,"startx",t-f*n.boxMargin,Math.min),x.updateVal(C,"stopx",o+f*n.boxMargin,Math.max),x.updateVal(L.data,"starty",i-f*n.boxMargin,Math.min),x.updateVal(L.data,"stopy",_+f*n.boxMargin,Math.max)},"updateItemBounds")}e(h,"updateFn"),this.sequenceItems.forEach(h())},"updateBounds"),insert:e(function(t,i,o,_){let n=Math.min(t,o),x=Math.max(t,o),T=Math.min(i,_),h=Math.max(i,_);this.updateVal(L.data,"startx",n,Math.min),this.updateVal(L.data,"starty",T,Math.min),this.updateVal(L.data,"stopx",x,Math.max),this.updateVal(L.data,"stopy",h,Math.max),this.updateBounds(n,T,x,h)},"insert"),bumpVerticalPos:e(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:e(function(){return this.verticalPos},"getVerticalPos"),getBounds:e(function(){return this.data},"getBounds")},{sectionFills:it,sectionColours:gt}=B,Xt=e(function(t,i,o,_){let n=r().journey,x="",T=n.height*2+n.diagramMarginY,h=o+T,M=0,E="#CCC",C="black",f=0;for(let[s,l]of i.entries()){if(x!==l.section){E=it[M%it.length],f=M%it.length,C=gt[M%gt.length];let k=0,b=l.section;for(let A=s;A<i.length;A++)if(i[A].section==b)k=k+1;else break;let u={x:s*n.taskMargin+s*n.width+W,y:50,text:l.section,fill:E,num:f,colour:C,taskCount:k};U.drawSection(t,u,n),x=l.section,M++}let c=l.people.reduce((k,b)=>{if(N[b])k[b]=N[b];return k},{});l.x=s*n.taskMargin+s*n.width+W,l.y=h,l.width=n.diagramMarginX,l.height=n.diagramMarginY,l.colour=C,l.fill=E,l.num=f,l.actors=c,U.drawTask(t,l,n,_),L.insert(l.x,l.y,l.x+l.width+n.taskMargin,450)}},"drawTasks"),mt={setConf:Yt,draw:qt},te={parser:$t,db:pt,renderer:mt,styles:Lt,init:e((t)=>{mt.setConf(t.journey),pt.clear()},"init")};export{te as diagram};
