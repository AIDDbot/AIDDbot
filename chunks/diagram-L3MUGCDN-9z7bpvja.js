import{L}from"./main-18ys0d8m.js";import{e,t,J,x,u,S,d,p,m,g,y,w,v,A,_}from"./main-r27nhh20.js";import{O}from"./main-cqqyjtr2.js";var k={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},D=32,P={axes:[],curves:[],options:k},T=structuredClone(P),U=x.radar,X=e(()=>A({...U,...u().radar}),"getConfig"),z=e(()=>T.axes,"getAxes"),K=e(()=>T.curves,"getCurves"),N=e(()=>T.options,"getOptions"),Y=e((n)=>{T.axes=n.map((a)=>({name:a.name,label:a.label??a.name}))},"setAxes"),Z=e((n)=>{T.curves=n.map((a)=>({name:a.name,label:a.label??a.name,entries:q(a.entries)}))},"setCurves"),q=e((n)=>{if(n[0].axis==null)return n.map((r)=>r.value);let a=z();if(a.length===0)throw Error("Axes must be populated before curves for reference entries");return a.map((r)=>{let s=n.find((o)=>o.axis?.$refText===r.name);if(s===void 0)throw Error("Missing entry for axis "+r.label);return s.value})},"computeCurveEntries"),Q=e((n)=>{let a=n.reduce((r,s)=>(r[s.name]=s,r),{});if(T.options={showLegend:a.showLegend?.value??k.showLegend,ticks:a.ticks?.value??k.ticks,max:a.max?.value??k.max,min:a.min?.value??k.min,graticule:a.graticule?.value??k.graticule},T.options.ticks>D)t.warn(`Radar diagram ticks (${T.options.ticks}) exceeds maximum allowed (${D}). Using ${D} instead.`),T.options.ticks=D},"setOptions"),tt=e(()=>{d(),T=structuredClone(P)},"clear"),E={getAxes:z,getCurves:K,getOptions:N,setAxes:Y,setCurves:Z,setOptions:Q,getConfig:X,clear:tt,setAccTitle:p,getAccTitle:m,setDiagramTitle:w,getDiagramTitle:v,getAccDescription:y,setAccDescription:g},et=e((n)=>{L(n,E);let{axes:a,curves:r,options:s}=n;E.setAxes(a),E.setCurves(r),E.setOptions(s)},"populate"),at={parse:e(async(n)=>{let a=await O("radar",n);t.debug(a),et(a)},"parse")},rt=e((n,a,r,s)=>{let o=s.db,c=o.getAxes(),h=o.getCurves(),i=o.getOptions(),l=o.getConfig(),f=o.getDiagramTitle(),b=_(a),C=nt(b,l),M=i.max??Math.max(...h.map((F)=>Math.max(...F.entries))),R=i.min,I=Math.min(l.width,l.height)/2;st(C,c,I,i.ticks,i.graticule),ot(C,c,I,l),G(C,c,h,R,M,i.graticule,l),V(C,h,i.showLegend,l),C.append("text").attr("class","radarTitle").text(f).attr("x",0).attr("y",-l.height/2-l.marginTop)},"draw"),nt=e((n,a)=>{let r=a.width+a.marginLeft+a.marginRight,s=a.height+a.marginTop+a.marginBottom,o={x:a.marginLeft+a.width/2,y:a.marginTop+a.height/2};return S(n,s,r,a.useMaxWidth??!0),n.attr("viewBox",`0 0 ${r} ${s}`).attr("overflow","visible"),n.append("g").attr("transform",`translate(${o.x}, ${o.y})`)},"drawFrame"),st=e((n,a,r,s,o)=>{if(o==="circle")for(let c=0;c<s;c++){let h=r*(c+1)/s;n.append("circle").attr("r",h).attr("class","radarGraticule")}else if(o==="polygon"){let c=a.length;for(let h=0;h<s;h++){let i=r*(h+1)/s,l=a.map((f,b)=>{let C=2*b*Math.PI/c-Math.PI/2,M=i*Math.cos(C),R=i*Math.sin(C);return`${M},${R}`}).join(" ");n.append("polygon").attr("points",l).attr("class","radarGraticule")}}},"drawGraticule"),ot=e((n,a,r,s)=>{let o=a.length;for(let c=0;c<o;c++){let h=a[c].label,i=2*c*Math.PI/o-Math.PI/2,l=Math.cos(i),f=Math.sin(i);n.append("line").attr("x1",0).attr("y1",0).attr("x2",r*s.axisScaleFactor*l).attr("y2",r*s.axisScaleFactor*f).attr("class","radarAxisLine");let b=l>0.01?"start":l<-0.01?"end":"middle",C=f>0.01?"hanging":f<-0.01?"auto":"central",M=4;n.append("text").text(h).attr("x",r*s.axisLabelFactor*l+M*l).attr("y",r*s.axisLabelFactor*f+M*f).attr("text-anchor",b).attr("dominant-baseline",C).attr("class","radarAxisLabel")}},"drawAxes");function G(n,a,r,s,o,c,h){let i=a.length,l=Math.min(h.width,h.height)/2;r.forEach((f,b)=>{if(f.entries.length!==i)return;let C=f.entries.map((M,R)=>{let I=2*Math.PI*R/i-Math.PI/2,F=B(M,s,o,l),H=F*Math.cos(I),j=F*Math.sin(I);return{x:H,y:j}});if(c==="circle")n.append("path").attr("d",W(C,h.curveTension)).attr("class",`radarCurve-${b}`);else if(c==="polygon")n.append("polygon").attr("points",C.map((M)=>`${M.x},${M.y}`).join(" ")).attr("class",`radarCurve-${b}`)})}e(G,"drawCurves");function B(n,a,r,s){let o=Math.min(Math.max(n,a),r);return s*(o-a)/(r-a)}e(B,"relativeRadius");function W(n,a){let r=n.length,s=`M${n[0].x},${n[0].y}`;for(let o=0;o<r;o++){let c=n[(o-1+r)%r],h=n[o],i=n[(o+1)%r],l=n[(o+2)%r],f={x:h.x+(i.x-c.x)*a,y:h.y+(i.y-c.y)*a},b={x:i.x-(l.x-h.x)*a,y:i.y-(l.y-h.y)*a};s+=` C${f.x},${f.y} ${b.x},${b.y} ${i.x},${i.y}`}return`${s} Z`}e(W,"closedRoundCurve");function V(n,a,r,s){if(!r)return;let o=(s.width/2+s.marginRight)*3/4,c=-(s.height/2+s.marginTop)*3/4,h=20;a.forEach((i,l)=>{let f=n.append("g").attr("transform",`translate(${o}, ${c+l*h})`);f.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${l}`),f.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}e(V,"drawLegend");var it={draw:rt},lt=e((n,a)=>{let r="";for(let s=0;s<n.THEME_COLOR_LIMIT;s++){let o=n[`cScale${s}`];r+=`
		.radarCurve-${s} {
			color: ${o};
			fill: ${o};
			fill-opacity: ${a.curveOpacity};
			stroke: ${o};
			stroke-width: ${a.curveStrokeWidth};
		}
		.radarLegendBox-${s} {
			fill: ${o};
			fill-opacity: ${a.curveOpacity};
			stroke: ${o};
		}
		`}return r},"genIndexStyles"),ct=e((n)=>{let a=J(),r=u(),s=A(a,r.themeVariables),o=A(s.radar,n);return{themeVariables:s,radarOptions:o}},"buildRadarStyleOptions"),dt=e(({radar:n}={})=>{let{themeVariables:a,radarOptions:r}=ct(n);return`
	.radarTitle {
		font-size: ${a.fontSize};
		color: ${a.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${r.axisColor};
		stroke-width: ${r.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${r.axisLabelFontSize}px;
		color: ${r.axisColor};
	}
	.radarGraticule {
		fill: ${r.graticuleColor};
		fill-opacity: ${r.graticuleOpacity};
		stroke: ${r.graticuleColor};
		stroke-width: ${r.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${r.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${lt(a,r)}
	`},"styles"),$t={parser:at,db:E,renderer:it,styles:dt};export{$t as diagram};
