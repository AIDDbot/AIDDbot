import{e,t,te,l,d,p,m,g,y,w,v,r,a,ti,T,G,B,F,Le,W,K}from"./main-r27nhh20.js";import{qe}from"./main-06f3ech2.js";import{V}from"./main-qnwky9z3.js";import{z}from"./main-2za6hzt9.js";var Wt=function(){var s=e(function(at,f,E,c){for(E=E||{},c=at.length;c--;E[at[c]]=f);return E},"o"),i=[1,2],u=[1,3],n=[1,4],b=[2,4],k=[1,9],D=[1,11],C=[1,16],h=[1,17],L=[1,18],I=[1,19],U=[1,33],H=[1,20],q=[1,21],P=[1,22],_=[1,23],X=[1,24],Y=[1,26],tt=[1,27],J=[1,28],et=[1,29],R=[1,30],ct=[1,31],Tt=[1,32],Et=[1,35],_t=[1,36],vt=[1,37],Dt=[1,38],ht=[1,34],A=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],Ct=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],zt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],$t={trace:e(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:e(function(f,E,c,x,N,o,dt){var S=o.length-1;switch(N){case 3:return x.setRootDoc(o[S]),o[S];break;case 4:this.$=[];break;case 5:if(o[S]!="nl")o[S-1].push(o[S]),this.$=o[S-1];break;case 6:case 7:this.$=o[S];break;case 8:this.$="nl";break;case 12:this.$=o[S];break;case 13:let xt=o[S-1];xt.description=x.trimColon(o[S]),this.$=xt;break;case 14:this.$={stmt:"relation",state1:o[S-2],state2:o[S]};break;case 15:let Lt=x.trimColon(o[S]);this.$={stmt:"relation",state1:o[S-3],state2:o[S-1],description:Lt};break;case 19:this.$={stmt:"state",id:o[S-3],type:"default",description:"",doc:o[S-1]};break;case 20:var st=o[S],rt=o[S-2].trim();if(o[S].match(":")){var St=o[S].split(":");st=St[0],rt=[rt,St[1]]}this.$={stmt:"state",id:st,type:"default",description:rt};break;case 21:this.$={stmt:"state",id:o[S-3],type:"default",description:o[S-5],doc:o[S-1]};break;case 22:this.$={stmt:"state",id:o[S],type:"fork"};break;case 23:this.$={stmt:"state",id:o[S],type:"join"};break;case 24:this.$={stmt:"state",id:o[S],type:"choice"};break;case 25:this.$={stmt:"state",id:x.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:o[S-1].trim(),note:{position:o[S-2].trim(),text:o[S].trim()}};break;case 29:this.$=o[S].trim(),x.setAccTitle(this.$);break;case 30:case 31:this.$=o[S].trim(),x.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:o[S-3],url:o[S-2],tooltip:o[S-1]};break;case 33:this.$={stmt:"click",id:o[S-3],url:o[S-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:o[S-1].trim(),classes:o[S].trim()};break;case 36:this.$={stmt:"style",id:o[S-1].trim(),styleClass:o[S].trim()};break;case 37:this.$={stmt:"applyClass",id:o[S-1].trim(),styleClass:o[S].trim()};break;case 38:x.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:x.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:x.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:x.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:o[S].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:o[S-2].trim(),classes:[o[S].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:o[S-2].trim(),classes:[o[S].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:i,5:u,6:n},{1:[3]},{3:5,4:i,5:u,6:n},{3:6,4:i,5:u,6:n},s([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],b,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:k,5:D,8:8,9:10,10:12,11:13,12:14,13:15,16:C,17:h,19:L,22:I,24:U,25:H,26:q,27:P,28:_,29:X,32:25,33:Y,35:tt,37:J,38:et,41:R,45:ct,48:Tt,51:Et,52:_t,53:vt,54:Dt,57:ht},s(A,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:C,17:h,19:L,22:I,24:U,25:H,26:q,27:P,28:_,29:X,32:25,33:Y,35:tt,37:J,38:et,41:R,45:ct,48:Tt,51:Et,52:_t,53:vt,54:Dt,57:ht},s(A,[2,7]),s(A,[2,8]),s(A,[2,9]),s(A,[2,10]),s(A,[2,11]),s(A,[2,12],{14:[1,40],15:[1,41]}),s(A,[2,16]),{18:[1,42]},s(A,[2,18],{20:[1,43]}),{23:[1,44]},s(A,[2,22]),s(A,[2,23]),s(A,[2,24]),s(A,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},s(A,[2,28]),{34:[1,49]},{36:[1,50]},s(A,[2,31]),{13:51,24:U,57:ht},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},s(Ct,[2,44],{58:[1,56]}),s(Ct,[2,45],{58:[1,57]}),s(A,[2,38]),s(A,[2,39]),s(A,[2,40]),s(A,[2,41]),s(A,[2,6]),s(A,[2,13]),{13:58,24:U,57:ht},s(A,[2,17]),s(zt,b,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},s(A,[2,29]),s(A,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},s(A,[2,14],{14:[1,71]}),{4:k,5:D,8:8,9:10,10:12,11:13,12:14,13:15,16:C,17:h,19:L,21:[1,72],22:I,24:U,25:H,26:q,27:P,28:_,29:X,32:25,33:Y,35:tt,37:J,38:et,41:R,45:ct,48:Tt,51:Et,52:_t,53:vt,54:Dt,57:ht},s(A,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},s(A,[2,34]),s(A,[2,35]),s(A,[2,36]),s(A,[2,37]),s(Ct,[2,46]),s(Ct,[2,47]),s(A,[2,15]),s(A,[2,19]),s(zt,b,{7:78}),s(A,[2,26]),s(A,[2,27]),{5:[1,79]},{5:[1,80]},{4:k,5:D,8:8,9:10,10:12,11:13,12:14,13:15,16:C,17:h,19:L,21:[1,81],22:I,24:U,25:H,26:q,27:P,28:_,29:X,32:25,33:Y,35:tt,37:J,38:et,41:R,45:ct,48:Tt,51:Et,52:_t,53:vt,54:Dt,57:ht},s(A,[2,32]),s(A,[2,33]),s(A,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:e(function(f,E){if(E.recoverable)this.trace(f);else{var c=Error(f);throw c.hash=E,c}},"parseError"),parse:e(function(f){var E=this,c=[0],x=[],N=[null],o=[],dt=this.table,S="",st=0,rt=0,St=0,xt=2,Lt=1,me=o.slice.call(arguments,1),O=Object.create(this.lexer),ot={yy:{}};for(var Ft in this.yy)if(Object.prototype.hasOwnProperty.call(this.yy,Ft))ot.yy[Ft]=this.yy[Ft];if(O.setInput(f,ot.yy),ot.yy.lexer=O,ot.yy.parser=this,typeof O.yylloc>"u")O.yylloc={};var Pt=O.yylloc;o.push(Pt);var be=O.options&&O.options.ranges;if(typeof ot.yy.parseError==="function")this.parseError=ot.yy.parseError;else this.parseError=Object.getPrototypeOf(this).parseError;function ke(Z){c.length=c.length-2*Z,N.length=N.length-Z,o.length=o.length-Z}e(ke,"popStack");function Kt(){var Z=x.pop()||O.lex()||Lt;if(typeof Z!=="number"){if(Z instanceof Array)x=Z,Z=x.pop();Z=E.symbols_[Z]||Z}return Z}e(Kt,"lex");var M,Bt,lt,Q,ts,Gt,ut={},wt,it,Xt,It;while(!0){if(lt=c[c.length-1],this.defaultActions[lt])Q=this.defaultActions[lt];else{if(M===null||typeof M>"u")M=Kt();Q=dt[lt]&&dt[lt][M]}if(typeof Q>"u"||!Q.length||!Q[0]){var Yt="";It=[];for(wt in dt[lt])if(this.terminals_[wt]&&wt>xt)It.push("'"+this.terminals_[wt]+"'");if(O.showPosition)Yt="Parse error on line "+(st+1)+`:
`+O.showPosition()+`
Expecting `+It.join(", ")+", got '"+(this.terminals_[M]||M)+"'";else Yt="Parse error on line "+(st+1)+": Unexpected "+(M==Lt?"end of input":"'"+(this.terminals_[M]||M)+"'");this.parseError(Yt,{text:O.match,token:this.terminals_[M]||M,line:O.yylineno,loc:Pt,expected:It})}if(Q[0]instanceof Array&&Q.length>1)throw Error("Parse Error: multiple actions possible at state: "+lt+", token: "+M);switch(Q[0]){case 1:if(c.push(M),N.push(O.yytext),o.push(O.yylloc),c.push(Q[1]),M=null,!Bt){if(rt=O.yyleng,S=O.yytext,st=O.yylineno,Pt=O.yylloc,St>0)St--}else M=Bt,Bt=null;break;case 2:if(it=this.productions_[Q[1]][1],ut.$=N[N.length-it],ut._$={first_line:o[o.length-(it||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(it||1)].first_column,last_column:o[o.length-1].last_column},be)ut._$.range=[o[o.length-(it||1)].range[0],o[o.length-1].range[1]];if(Gt=this.performAction.apply(ut,[S,rt,st,ot.yy,Q[1],N,o].concat(me)),typeof Gt<"u")return Gt;if(it)c=c.slice(0,-1*it*2),N=N.slice(0,-1*it),o=o.slice(0,-1*it);c.push(this.productions_[Q[1]][0]),N.push(ut.$),o.push(ut._$),Xt=dt[c[c.length-2]][c[c.length-1]],c.push(Xt);break;case 3:return!0}}return!0},"parse")},ye=function(){var at={EOF:1,parseError:e(function(E,c){if(this.yy.parser)this.yy.parser.parseError(E,c);else throw Error(E)},"parseError"),setInput:e(function(f,E){if(this.yy=E||this.yy||{},this._input=f,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges)this.yylloc.range=[0,0];return this.offset=0,this},"setInput"),input:e(function(){var f=this._input[0];this.yytext+=f,this.yyleng++,this.offset++,this.match+=f,this.matched+=f;var E=f.match(/(?:\r\n?|\n).*/g);if(E)this.yylineno++,this.yylloc.last_line++;else this.yylloc.last_column++;if(this.options.ranges)this.yylloc.range[1]++;return this._input=this._input.slice(1),f},"input"),unput:e(function(f){var E=f.length,c=f.split(/(?:\r\n?|\n)/g);this._input=f+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-E),this.offset-=E;var x=this.match.split(/(?:\r\n?|\n)/g);if(this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1)this.yylineno-=c.length-1;var N=this.yylloc.range;if(this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===x.length?this.yylloc.first_column:0)+x[x.length-c.length].length-c[0].length:this.yylloc.first_column-E},this.options.ranges)this.yylloc.range=[N[0],N[0]+this.yyleng-E];return this.yyleng=this.yytext.length,this},"unput"),more:e(function(){return this._more=!0,this},"more"),reject:e(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:e(function(f){this.unput(this.match.slice(f))},"less"),pastInput:e(function(){var f=this.matched.substr(0,this.matched.length-this.match.length);return(f.length>20?"...":"")+f.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:e(function(){var f=this.match;if(f.length<20)f+=this._input.substr(0,20-f.length);return(f.substr(0,20)+(f.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:e(function(){var f=this.pastInput(),E=Array(f.length+1).join("-");return f+this.upcomingInput()+`
`+E+"^"},"showPosition"),test_match:e(function(f,E){var c,x,N;if(this.options.backtrack_lexer){if(N={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges)N.yylloc.range=this.yylloc.range.slice(0)}if(x=f[0].match(/(?:\r\n?|\n).*/g),x)this.yylineno+=x.length;if(this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:x?x[x.length-1].length-x[x.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+f[0].length},this.yytext+=f[0],this.match+=f[0],this.matches=f,this.yyleng=this.yytext.length,this.options.ranges)this.yylloc.range=[this.offset,this.offset+=this.yyleng];if(this._more=!1,this._backtrack=!1,this._input=this._input.slice(f[0].length),this.matched+=f[0],c=this.performAction.call(this,this.yy,this,E,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input)this.done=!1;if(c)return c;else if(this._backtrack){for(var o in N)this[o]=N[o];return!1}return!1},"test_match"),next:e(function(){if(this.done)return this.EOF;if(!this._input)this.done=!0;var f,E,c,x;if(!this._more)this.yytext="",this.match="";var N=this._currentRules();for(var o=0;o<N.length;o++)if(c=this._input.match(this.rules[N[o]]),c&&(!E||c[0].length>E[0].length)){if(E=c,x=o,this.options.backtrack_lexer)if(f=this.test_match(c,N[o]),f!==!1)return f;else if(this._backtrack){E=!1;continue}else return!1;else if(!this.options.flex)break}if(E){if(f=this.test_match(E,N[x]),f!==!1)return f;return!1}if(this._input==="")return this.EOF;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:e(function(){var E=this.next();if(E)return E;else return this.lex()},"lex"),begin:e(function(E){this.conditionStack.push(E)},"begin"),popState:e(function(){var E=this.conditionStack.length-1;if(E>0)return this.conditionStack.pop();else return this.conditionStack[0]},"popState"),_currentRules:e(function(){if(this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1])return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;else return this.conditions.INITIAL.rules},"_currentRules"),topState:e(function(E){if(E=this.conditionStack.length-1-Math.abs(E||0),E>=0)return this.conditionStack[E];else return"INITIAL"},"topState"),pushState:e(function(E){this.begin(E)},"pushState"),stateStackSize:e(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:e(function(E,c,x,N){function o(){let S=c.yytext.indexOf("%%");if(S===0)return!1;if(S>0){let st=c.yytext.slice(0,S),rt=c.yytext.slice(S);if(rt)E.lexer.unput(rt);c.yytext=st}return!0}e(o,"processId");var dt=N;switch(x){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:return 51;case 5:return 52;case 6:return 53;case 7:return 54;case 8:return 5;case 9:break;case 10:break;case 11:break;case 12:break;case 13:return this.pushState("SCALE"),17;break;case 14:return 18;case 15:this.popState();break;case 16:return this.begin("acc_title"),33;break;case 17:return this.popState(),"acc_title_value";break;case 18:return this.begin("acc_descr"),35;break;case 19:return this.popState(),"acc_descr_value";break;case 20:this.begin("acc_descr_multiline");break;case 21:this.popState();break;case 22:return"acc_descr_multiline_value";case 23:return this.pushState("CLASSDEF"),41;break;case 24:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";break;case 25:return this.popState(),this.pushState("CLASSDEFID"),42;break;case 26:return this.popState(),43;break;case 27:return this.pushState("CLASS"),48;break;case 28:return this.popState(),this.pushState("CLASS_STYLE"),49;break;case 29:return this.popState(),50;break;case 30:return this.pushState("STYLE"),45;break;case 31:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;break;case 32:return this.popState(),47;break;case 33:return this.pushState("SCALE"),17;break;case 34:return 18;case 35:this.popState();break;case 36:this.pushState("STATE");break;case 37:return this.popState(),c.yytext=c.yytext.slice(0,-8).trim(),25;break;case 38:return this.popState(),c.yytext=c.yytext.slice(0,-8).trim(),26;break;case 39:return this.popState(),c.yytext=c.yytext.slice(0,-10).trim(),27;break;case 40:return this.popState(),c.yytext=c.yytext.slice(0,-8).trim(),25;break;case 41:return this.popState(),c.yytext=c.yytext.slice(0,-8).trim(),26;break;case 42:return this.popState(),c.yytext=c.yytext.slice(0,-10).trim(),27;break;case 43:return 51;case 44:return 52;case 45:return 53;case 46:return 54;case 47:this.pushState("STATE_STRING");break;case 48:return this.pushState("STATE_ID"),"AS";break;case 49:if(!o())return;return this.popState(),"ID";break;case 50:this.popState();break;case 51:return"STATE_DESCR";case 52:throw Error('Error: State name must be a single word. Found: "'+c.yytext.trim()+'"');case 53:return 19;case 54:this.popState();break;case 55:return this.popState(),this.pushState("struct"),20;break;case 56:return this.popState(),21;break;case 57:break;case 58:return this.begin("NOTE"),29;break;case 59:return this.popState(),this.pushState("NOTE_ID"),59;break;case 60:return this.popState(),this.pushState("NOTE_ID"),60;break;case 61:this.popState(),this.pushState("FLOATING_NOTE");break;case 62:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";break;case 63:break;case 64:return"NOTE_TEXT";case 65:if(!o())return;return this.popState(),"ID";break;case 66:if(!o())return;return this.popState(),this.pushState("NOTE_TEXT"),24;break;case 67:return this.popState(),c.yytext=c.yytext.substr(2).trim(),31;break;case 68:return this.popState(),c.yytext=c.yytext.slice(0,-8).trim(),31;break;case 69:return 6;case 70:return 6;case 71:return 16;case 72:return 57;case 73:if(!o())return;return 24;case 74:return c.yytext=c.yytext.trim(),14;break;case 75:return 15;case 76:return 28;case 77:return 58;case 78:return 5;case 79:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:\w+\s+\w+.*?\{)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?\n\s*end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:(?:[^:\n;]|:[^:\n;])+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[10,11,12],inclusive:!1},struct:{rules:[10,11,12,23,27,30,36,43,44,45,46,56,57,58,72,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[65],inclusive:!1},FLOATING_NOTE:{rules:[62,63,64],inclusive:!1},NOTE_TEXT:{rules:[67,68],inclusive:!1},NOTE_ID:{rules:[66],inclusive:!1},NOTE:{rules:[59,60,61],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[32],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[31],inclusive:!1},CLASS_STYLE:{rules:[29],inclusive:!1},CLASS:{rules:[28],inclusive:!1},CLASSDEFID:{rules:[26],inclusive:!1},CLASSDEF:{rules:[24,25],inclusive:!1},acc_descr_multiline:{rules:[21,22],inclusive:!1},acc_descr:{rules:[19],inclusive:!1},acc_title:{rules:[17],inclusive:!1},SCALE:{rules:[14,15,34,35],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[49],inclusive:!1},STATE_STRING:{rules:[50,51],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[10,11,12,37,38,39,40,41,42,47,48,52,53,54,55],inclusive:!1},ID:{rules:[10,11,12],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,11,12,13,16,18,20,23,27,30,33,36,55,58,69,70,71,72,73,74,75,77,78,79],inclusive:!0}}};return at}();$t.lexer=ye;function At(){this.yy={}}return e(At,"Parser"),At.prototype=$t,$t.Parser=At,new At}();Wt.parser=Wt;var Te=Wt,Ee="TB",re="TB",Jt="dir",pt="state",ft="root",jt="relation",_e="classDef",ve="style",De="applyClass",bt="default",ie="divider",ae="fill:none",ne="fill: #333",oe="c",le="markdown",ce="normal",Vt="rect",Mt="rectWithTitle",Ce="stateStart",Ae="stateEnd",Ut="divider",qt="roundedWithTitle",xe="note",we="noteGroup",kt="statediagram",Ie="state",Ne=`${kt}-${Ie}`,he="transition",Oe="note",Re="note-edge",$e=`${he} ${Re}`,Fe=`${kt}-${Oe}`,Pe="cluster",Be=`${kt}-${Pe}`,Ge="cluster-alt",Ye=`${kt}-${Ge}`,de="parent",ue="note",Ve="state",Ht="----",Me=`${Ht}${ue}`,Qt=`${Ht}${de}`,Ot=new Map,nt=0,fe=0,gt=new Map,We=e((s,i,u,n)=>{if(s===Ut&&u?.id!==void 0&&gt.has(u.id)){let D=gt.get(u.id);return gt.set(i,D),D}let b=fe++,k=n?void 0:b;return gt.set(i,k),k},"colorSlotFor");function Rt(s="",i=0,u="",n=Ht){let b=u!==null&&u.length>0?`${n}${u}`:"";return`${Ve}-${s}${b}-${i}`}e(Rt,"stateDomId");var je=e((s,i,u,n,b,k,D,C)=>{t.trace("items",i),i.forEach((h)=>{switch(h.stmt){case pt:mt(s,h,u,n,b,k,D,C);break;case bt:mt(s,h,u,n,b,k,D,C);break;case jt:{mt(s,h.state1,u,n,b,k,D,C),mt(s,h.state2,u,n,b,k,D,C);let L=D==="neo",I={id:"edge"+nt,start:h.state1.id,end:h.state2.id,arrowhead:"normal",arrowTypeEnd:L?"arrow_barb_neo":"arrow_barb",style:ae,labelStyle:"",label:l.sanitizeText(h.description??"",r()),arrowheadStyle:ne,labelpos:oe,labelType:le,thickness:ce,classes:he,look:D};b.push(I),nt++}break}})},"setupDoc"),Zt=e((s,i=re)=>{let u=i;if(s.doc){for(let n of s.doc)if(n.stmt==="dir")u=n.value}return u},"getDir");function yt(s,i,u){if(!i.id||i.id==="</join></fork>"||i.id==="</choice>")return;if(i.cssClasses){if(!Array.isArray(i.cssCompiledStyles))i.cssCompiledStyles=[];i.cssClasses.split(" ").forEach((b)=>{let k=u.get(b);if(k)i.cssCompiledStyles=[...i.cssCompiledStyles??[],...k.styles]})}let n=s.find((b)=>b.id===i.id);if(n)Object.assign(n,i);else s.push(i)}e(yt,"insertOrUpdateNode");function pe(s){return s?.classes?.join(" ")??""}e(pe,"getClassesFromDbInfo");function Se(s){return s?.styles??[]}e(Se,"getStylesFromDbInfo");var mt=e((s,i,u,n,b,k,D,C)=>{let h=i.id,L=u.get(h),I=pe(L),U=Se(L),H=r(),q=I.trim()!==""||U.length>0;if(t.info("dataFetcher parsedItem",i,L,U),h!=="root"){let P=Vt;if(i.start===!0)P=Ce;else if(i.start===!1)P=Ae;if(i.type!==bt)P=i.type;if(!Ot.get(h))Ot.set(h,{id:h,shape:P,description:l.sanitizeText(h,H),cssClasses:`${I} ${Ne}`,cssStyles:U});let _=Ot.get(h);if(i.description){if(Array.isArray(_.description))_.shape=Mt,_.description.push(i.description);else if(_.description?.length&&_.description.length>0)if(_.shape=Mt,_.description===h)_.description=[i.description];else _.description=[_.description,i.description];else _.shape=Vt,_.description=i.description;_.description=l.sanitizeTextOrArray(_.description,H)}if(_.description?.length===1&&_.shape===Mt)if(_.type==="group")_.shape=qt;else _.shape=Vt;if(!_.type&&i.doc)t.info("Setting cluster for XCX",h,Zt(i)),_.type="group",_.isGroup=!0,_.dir=Zt(i),_.shape=i.type===ie?Ut:qt,_.colorIndex=We(_.shape,h,s,q),_.cssClasses=`${_.cssClasses} ${Be} ${k?Ye:""}`;let X={labelStyle:"",shape:_.shape,label:_.description,cssClasses:_.cssClasses,cssCompiledStyles:[],cssStyles:_.cssStyles,id:h,dir:_.dir,domId:Rt(h,nt),type:_.type,isGroup:_.type==="group",colorIndex:_.colorIndex,padding:8,rx:10,ry:10,look:D,labelType:"markdown"};if(X.shape===Ut)X.label="";if(s&&s.id!=="root")t.trace("Setting node ",h," to be child of its parent ",s.id),X.parentId=s.id;if(X.centerLabel=!0,i.note){let Y={labelStyle:"",shape:xe,label:i.note.text,labelType:"markdown",cssClasses:Fe,cssStyles:[],cssCompiledStyles:[],id:h+Me+"-"+nt,domId:Rt(h,nt,ue),type:"node",isGroup:!1,padding:H.flowchart?.padding,look:D,position:i.note.position},tt=h+Qt,J={labelStyle:"",shape:we,label:i.note.text,cssClasses:_.cssClasses,cssStyles:[],id:h+Qt,domId:Rt(h,nt,de),type:"group",isGroup:!0,padding:16,look:D,position:i.note.position};nt++,J.id=tt,Y.parentId=tt,yt(n,J,C),yt(n,Y,C),yt(n,X,C);let et=h,R=Y.id;if(i.note.position==="left of")et=Y.id,R=h;b.push({id:et+"-"+R,start:et,end:R,arrowhead:"none",arrowTypeEnd:"",style:ae,labelStyle:"",classes:$e,pattern:"dashed",arrowheadStyle:ne,labelpos:oe,labelType:le,thickness:ce,look:D})}else yt(n,X,C)}if(i.doc)t.trace("Adding nodes children "),je(i,i.doc,u,n,b,!k,D,C)},"dataFetcher"),Ue=e(()=>{Ot.clear(),nt=0,fe=0,gt.clear()},"reset"),ge=e((s,i=re)=>{if(!s.doc)return i;let u=i;for(let n of s.doc)if(n.stmt==="dir")u=n.value;return u},"getDir"),He=e(function(s,i){return i.db.getClasses()},"getClasses"),ze=e(async function(s,i,u,n){t.info("REF0:"),t.info("Drawing state diagram (v2)",i);let{securityLevel:b,state:k,layout:D}=r();n.db.extract(n.db.getRootDocV2());let C=n.db.getData(),h=V(i,b);if(C.type=n.type,C.layoutAlgorithm=K(D),C.nodeSpacing=k?.nodeSpacing||50,C.rankSpacing=k?.rankSpacing||50,r().look==="neo")C.markers=["barbNeo"];else C.markers=["barb"];C.diagramId=i,await W(C,h);let I=8;try{(typeof n.db.getLinks==="function"?n.db.getLinks():new Map).forEach((H,q)=>{let P=typeof q==="string"?q:typeof q?.id==="string"?q.id:"",_=C.nodes.find((R)=>R.id===P);if(!P){t.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(q));return}let X=h.node()?.querySelectorAll("g.node, g.rough-node"),Y;if(X?.forEach((R)=>{let ct=R.textContent?.trim();if(R.id===_?.domId||ct===P)Y=R}),!Y){t.warn("⚠️ Could not find node matching text:",P);return}let tt=Y.parentNode;if(!tt){t.warn("⚠️ Node has no parent, cannot wrap:",P);return}let J=document.createElementNS("http://www.w3.org/2000/svg","a"),et=H.url.replace(/^"+|"+$/g,"");if(J.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",et),J.setAttribute("target","_blank"),H.tooltip){let R=H.tooltip.replace(/^"+|"+$/g,"");J.setAttribute("title",R),Y.setAttribute("title",R)}tt.replaceChild(J,Y),J.appendChild(Y),t.info("\uD83D\uDD17 Wrapped node in <a> tag for:",P,H.url)})}catch(U){t.error("❌ Error injecting clickable links:",U)}T.insertTitle(h,"statediagramTitleText",k?.titleTopMargin??25,n.db.getDiagramTitle()),z(h,I,kt,k?.useMaxWidth??!0)},"draw"),Ke={getClasses:He,draw:ze,getDir:ge},j={START_NODE:"[*]",START_TYPE:"start",END_NODE:"[*]",END_TYPE:"end",COLOR_KEYWORD:"color",FILL_KEYWORD:"fill",BG_FILL:"bgFill",STYLECLASS_SEP:","},ee=e(()=>new Map,"newClassesList"),se=e(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),Nt=e((s)=>JSON.parse(JSON.stringify(s)),"clone"),Xe=class{constructor(s){this.version=s,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=ee(),this.documents={root:se()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.funs=[],this.getAccTitle=m,this.setAccTitle=p,this.getAccDescription=y,this.setAccDescription=g,this.setDiagramTitle=w,this.getDiagramTitle=v,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this),this.bindFunctions=this.bindFunctions.bind(this)}static{e(this,"StateDB")}static{this.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}}extract(s){this.clear(!0);for(let n of Array.isArray(s)?s:s.doc)switch(n.stmt){case pt:this.addState(n.id.trim(),n.type,n.doc,n.description,n.note);break;case jt:this.addRelation(n.state1,n.state2,n.description);break;case _e:this.addStyleClass(n.id.trim(),n.classes);break;case ve:this.handleStyleDef(n);break;case De:this.setCssClass(n.id.trim(),n.styleClass);break;case"click":this.addLink(n.id,n.url,n.tooltip);break}let i=this.getStates(),u=r();Ue(),mt(void 0,this.getRootDocV2(),i,this.nodes,this.edges,!0,u.look,this.classes);for(let n of this.nodes){if(!Array.isArray(n.label))continue;if(n.description=n.label.slice(1),n.isGroup&&n.description.length>0)throw Error(`Group nodes can only have label. Remove the additional description for node [${n.id}]`);n.label=n.label[0]}}handleStyleDef(s){let i=s.id.trim().split(","),u=s.styleClass.split(",");for(let n of i){let b=this.getState(n);if(!b){let k=n.trim();this.addState(k),b=this.getState(k)}if(b)b.styles=u.map((k)=>k.replace(/;/g,"")?.trim())}}setRootDoc(s){if(t.info("Setting root doc",s),this.rootDoc=s,this.version===1)this.extract(s);else this.extract(this.getRootDocV2())}docTranslator(s,i,u){if(i.stmt===jt){this.docTranslator(s,i.state1,!0),this.docTranslator(s,i.state2,!1);return}if(i.stmt===pt)if(i.id===j.START_NODE)i.id=s.id+(u?"_start":"_end"),i.start=u;else i.id=i.id.trim();if(i.stmt!==ft&&i.stmt!==pt||!i.doc)return;let n=[],b=[];for(let k of i.doc)if(k.type===ie){let D=Nt(k);D.doc=Nt(b),n.push(D),b=[]}else b.push(k);if(n.length>0&&b.length>0){let k={stmt:pt,id:ti(),type:"divider",doc:Nt(b)};n.push(Nt(k)),i.doc=n}i.doc.forEach((k)=>this.docTranslator(i,k,!0))}getRootDocV2(){return this.docTranslator({id:ft,stmt:ft},{id:ft,stmt:ft,doc:this.rootDoc},!0),{id:ft,doc:this.rootDoc}}addState(s,i=bt,u=void 0,n=void 0,b=void 0,k=void 0,D=void 0,C=void 0){let h=s?.trim();if(!this.currentDocument.states.has(h))t.info("Adding state ",h,n),this.currentDocument.states.set(h,{stmt:pt,id:h,descriptions:[],type:i,doc:u,note:b,classes:[],styles:[],textStyles:[]});else{let L=this.currentDocument.states.get(h);if(!L)throw Error(`State not found: ${h}`);if(!L.doc)L.doc=u;if(!L.type)L.type=i}if(n)t.info("Setting state description",h,n),(Array.isArray(n)?n:[n]).forEach((I)=>this.addDescription(h,I.trim()));if(b){let L=this.currentDocument.states.get(h);if(!L)throw Error(`State not found: ${h}`);L.note=b,L.note.text=l.sanitizeText(L.note.text,r())}if(k)t.info("Setting state classes",h,k),(Array.isArray(k)?k:[k]).forEach((I)=>this.setCssClass(h,I.trim()));if(D)t.info("Setting state styles",h,D),(Array.isArray(D)?D:[D]).forEach((I)=>this.setStyle(h,I.trim()));if(C)t.info("Setting state styles",h,D),(Array.isArray(C)?C:[C]).forEach((I)=>this.setTextStyle(h,I.trim()))}clear(s){if(this.nodes=[],this.edges=[],this.funs=[this.setupToolTips.bind(this)],this.documents={root:se()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=ee(),!s)this.links=new Map,d()}getState(s){return this.currentDocument.states.get(s)}getStates(){return this.currentDocument.states}logDocuments(){t.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(s,i,u){this.links.set(s,{url:i,tooltip:u}),t.warn("Adding link",s,i,u)}getLinks(){return this.links}startIdIfNeeded(s=""){if(s===j.START_NODE)return this.startEndCount++,`${j.START_TYPE}${this.startEndCount}`;return s}startTypeIfNeeded(s="",i=bt){return s===j.START_NODE?j.START_TYPE:i}endIdIfNeeded(s=""){if(s===j.END_NODE)return this.startEndCount++,`${j.END_TYPE}${this.startEndCount}`;return s}endTypeIfNeeded(s="",i=bt){return s===j.END_NODE?j.END_TYPE:i}addRelationObjs(s,i,u=""){let n=this.startIdIfNeeded(s.id.trim()),b=this.startTypeIfNeeded(s.id.trim(),s.type),k=this.startIdIfNeeded(i.id.trim()),D=this.startTypeIfNeeded(i.id.trim(),i.type);this.addState(n,b,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),this.addState(k,D,i.doc,i.description,i.note,i.classes,i.styles,i.textStyles),this.currentDocument.relations.push({id1:n,id2:k,relationTitle:l.sanitizeText(u,r())})}addRelation(s,i,u){if(typeof s==="object"&&typeof i==="object")this.addRelationObjs(s,i,u);else if(typeof s==="string"&&typeof i==="string"){let n=this.startIdIfNeeded(s.trim()),b=this.startTypeIfNeeded(s),k=this.endIdIfNeeded(i.trim()),D=this.endTypeIfNeeded(i);this.addState(n,b),this.addState(k,D),this.currentDocument.relations.push({id1:n,id2:k,relationTitle:u?l.sanitizeText(u,r()):void 0})}}addDescription(s,i){let u=this.currentDocument.states.get(s),n=i.startsWith(":")?i.replace(":","").trim():i;u?.descriptions?.push(l.sanitizeText(n,r()))}cleanupLabel(s){return s.startsWith(":")?s.slice(2).trim():s.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(s,i=""){if(!this.classes.has(s))this.classes.set(s,{id:s,styles:[],textStyles:[]});let u=this.classes.get(s);if(i&&u)i.split(j.STYLECLASS_SEP).forEach((n)=>{let b=n.replace(/([^;]*);/,"$1").trim();if(RegExp(j.COLOR_KEYWORD).exec(n)){let D=b.replace(j.FILL_KEYWORD,j.BG_FILL).replace(j.COLOR_KEYWORD,j.FILL_KEYWORD);u.textStyles.push(D)}u.styles.push(b)})}getClasses(){return this.classes}setupToolTips(s){let i=qe();a(s).select("svg").selectAll("g.node, g.rough-node").on("mouseover",(b)=>{let k=a(b.currentTarget),D=k.attr("title");if(D===null)return;let C=b.currentTarget?.getBoundingClientRect();i.transition().duration(200).style("opacity",".9"),i.style("left",window.scrollX+C.left+(C.right-C.left)/2+"px").style("top",window.scrollY+C.bottom+"px"),i.html(te.sanitize(D)),k.classed("hover",!0)}).on("mouseout",(b)=>{i.transition().duration(500).style("opacity",0),a(b.currentTarget).classed("hover",!1)})}setCssClass(s,i){s.split(",").forEach((u)=>{let n=this.getState(u);if(!n){let b=u.trim();this.addState(b),n=this.getState(b)}n?.classes?.push(i)})}setStyle(s,i){this.getState(s)?.styles?.push(i)}setTextStyle(s,i){this.getState(s)?.textStyles?.push(i)}bindFunctions(s){this.funs.forEach((i)=>{i(s)})}getDirectionStatement(){return this.rootDoc.find((s)=>s.stmt===Jt)}getDirection(){return this.getDirectionStatement()?.value??Ee}setDirection(s){let i=this.getDirectionStatement();if(i)i.value=s;else this.rootDoc.unshift({stmt:Jt,value:s})}trimColon(s){return s.startsWith(":")?s.slice(1).trim():s.trim()}getData(){let s=r();for(let i of this.nodes)if(i.wrappingWidth??=s.state?.wrappingWidth,!i.isGroup)i.minWidth??=s.state?.minNodeWidth;return{nodes:this.nodes,edges:this.edges,other:{},config:s,direction:ge(this.getRootDocV2())}}getConfig(){return r().state}},Je=e((s)=>{let{theme:i,bkgColorArray:u,borderColorArray:n}=s;if(!B(i,n))return"";let b=F(s.look),k=G(u),D="";for(let C=0;C<Le(n);C++){let h=n[C],L=k?`fill: ${u[C%u.length]};`:"",I=`[data-look="${b}"][data-color-id="color-${C}"]`;D+=`

    /* The title strip: \`rect.outer\` spans the whole composite and \`rect.inner\` covers
       the body, so what stays visible of \`outer\` is the band behind the label. */
    ${I}.statediagram-cluster rect.outer {
      stroke: ${h};
      ${L}
    }

    ${I}.statediagram-cluster rect.inner {
      stroke: ${h};
    }

    /* Concurrency regions. Siblings of one composite share a slot, so a divided composite
       reads as one thing split into parts rather than as several composites. */
    ${I}.statediagram-cluster rect.divider {
      stroke: ${h};
      ${L}
    }

    /* handDrawn draws the same container as roughjs shapes rather than plain rects, so it
       needs its own rules. \`roundedWithTitle\` and \`divider\` name those groups \`outer\`,
       \`inner\` and \`divider\` to match the classic branch, which is what lets these
       discriminate -- a bare \`.statediagram-cluster path\` rule reached the body as well and
       tinted the whole composite, losing \`compositeBackground\` and diverging from what
       classic and neo do.

       roughjs emits two paths per shape and marks them: the filled shape carries
       \`stroke="none"\` and the sketched outline carries \`fill="none"\`. Splitting on that is
       what keeps \`fill\` off the outline -- a rough outline is open squiggles, not a closed
       region, so filling it produces smears -- and keeps \`stroke\` off the fill shape, which
       would otherwise gain an edge it was drawn without. */
    ${I}.statediagram-cluster .outer path[stroke='none'] {
      ${L}
    }

    ${I}.statediagram-cluster .outer path[fill='none'] {
      stroke: ${h};
    }

    /* No \`.inner\` rule on purpose. The body shape is left entirely alone under handDrawn,
       where a rect's \`inner\` counterpart cannot be recoloured safely: roughjs draws a
       hachure fill as *stroked* lines, so its fill paths carry \`fill="none"\` exactly like
       the outline and no selector separates them. An \`.inner\` stroke rule therefore
       repainted the hatching of every alt composite in the palette colour instead of
       leaving it on \`altBackground\`. The container still reads as palette-coloured: the
       \`outer\` shape spans the whole composite, so its outline already frames the body. */

    /* Regions split the same way, which is why \`divider\` fills solid rather than taking
       roughjs's default hachure -- see the note on that call. Hatched, both of its paths
       carried \`fill="none"\` and these two rules degenerated: the tint matched nothing and
       the border rule repainted the hatching. */
    ${I}.statediagram-cluster .divider path[stroke='none'] {
      ${L}
    }

    ${I}.statediagram-cluster .divider path[fill='none'] {
      stroke: ${h};
    }
    `}return D},"genColor"),Qe=e((s)=>`
${Je(s)}
defs [id$="-barbEnd"] {
    fill: ${s.transitionColor};
    stroke: ${s.transitionColor};
  }
g.stateGroup text {
  fill: ${s.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${s.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${s.stateLabelColor};
}

g.stateGroup rect {
  fill: ${s.mainBkg};
  stroke: ${s.nodeBorder};
}

g.stateGroup line {
  stroke: ${s.lineColor};
  stroke-width: ${s.strokeWidth||1};
}

.transition {
  stroke: ${s.transitionColor};
  stroke-width: ${s.strokeWidth||1};
  fill: none;
}

.stateGroup .composit {
  fill: ${s.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${s.noteBorderColor};
  fill: ${s.noteBkgColor};

  text {
    fill: ${s.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${s.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${s.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${s.edgeLabelBackground};
  p {
    background-color: ${s.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${s.edgeLabelBackground};
    fill: ${s.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${s.transitionLabelColor||s.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${s.transitionLabelColor||s.tertiaryTextColor};
}

.stateLabel text {
  fill: ${s.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${s.specialStateColor};
  stroke: ${s.specialStateColor};
}

.node .fork-join {
  fill: ${s.specialStateColor};
  stroke: ${s.specialStateColor};
}

.node circle.state-end {
  fill: ${s.innerEndBackground};
  stroke: ${s.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${s.compositeBackground||s.background};
  // stroke: ${s.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${s.stateBkg||s.mainBkg};
  stroke: ${s.stateBorder||s.nodeBorder};
  stroke-width: ${s.strokeWidth||1}px;
}
.node polygon {
  fill: ${s.mainBkg};
  stroke: ${s.stateBorder||s.nodeBorder};;
  stroke-width: ${s.strokeWidth||1}px;
}
[id$="-barbEnd"] {
  fill: ${s.lineColor};
}

.statediagram-cluster rect {
  fill: ${s.compositeTitleBackground};
  stroke: ${s.stateBorder||s.nodeBorder};
  stroke-width: ${s.strokeWidth||1}px;
}

.cluster-label, .nodeLabel {
  color: ${s.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${s.stateBorder||s.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${s.compositeBackground||s.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${s.altBackground?s.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${s.altBackground?s.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${s.noteBkgColor};
  stroke: ${s.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${s.noteBkgColor};
  stroke: ${s.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${s.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${s.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${s.noteTextColor};
}

[id$="-dependencyStart"], [id$="-dependencyEnd"] {
  fill: ${s.lineColor};
  stroke: ${s.lineColor};
  stroke-width: ${s.strokeWidth||1};
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${s.textColor};
}

[data-look="neo"].statediagram-cluster rect {
  fill: ${s.mainBkg};
  stroke: ${s.useGradient?"url("+s.svgId+"-gradient)":s.stateBorder||s.nodeBorder};
  stroke-width: ${s.strokeWidth??1};
}
[data-look="neo"].statediagram-cluster rect.outer {
  rx: ${s.radius}px;
  ry: ${s.radius}px;
  filter: ${s.dropShadow?s.dropShadow.replace("url(#drop-shadow)",`url(${s.svgId}-drop-shadow)`):"none"}
}
`,"getStyles"),Ze=Qe,ks={parser:Te,get db(){return new Xe(2)},renderer:Ke,styles:Ze,init:e((s)=>{if(!s.state)s.state={};s.state.arrowMarkerAbsolute=s.arrowMarkerAbsolute},"init")};export{ks as diagram};
