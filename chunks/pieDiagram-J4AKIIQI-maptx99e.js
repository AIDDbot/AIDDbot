import{L}from"./main-18ys0d8m.js";import{e,t,x,S,d,p,m,g,y,w,v,r,We,Si,ue,A,_}from"./main-r27nhh20.js";import{O}from"./main-cqqyjtr2.js";import{Oe}from"./main-39ba7v6n.js";var it=x.pie,Z={sections:new Map,showData:!1,config:it},{sections:B,showData:j}=Z,ut=structuredClone(it),mt=e(()=>structuredClone(ut),"getConfig"),vt=e(()=>{B=new Map,j=Z.showData,d()},"clear"),St=e(({label:a,value:o})=>{if(o<0)throw Error(`"${a}" has invalid value: ${o}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);if(!B.has(a))B.set(a,o),t.debug(`added new section: ${a}, with value: ${o}`)},"addSection"),xt=e(()=>B,"getSections"),wt=e((a)=>{j=a},"setShowData"),Ct=e(()=>j,"getShowData"),ot={getConfig:mt,clear:vt,setDiagramTitle:w,getDiagramTitle:v,setAccTitle:p,getAccTitle:m,setAccDescription:g,getAccDescription:y,addSection:St,getSections:xt,setShowData:wt,getShowData:Ct},$t=e((a,o)=>{L(a,o),o.setShowData(a.showData),a.sections.map(o.addSection)},"populateDb"),Dt={parse:e(async(a)=>{let o=await O("pie",a);t.debug(o),$t(o,ot)},"parse")},yt=e((a)=>`
  .pieCircle{
    stroke: ${a.pieStrokeColor};
    stroke-width : ${a.pieStrokeWidth};
    opacity : ${a.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${a.pieOuterStrokeColor};
    stroke-width: ${a.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${a.pieTitleTextSize};
    fill: ${a.pieTitleTextColor};
    font-family: ${a.fontFamily};
  }
  .slice {
    font-family: ${a.fontFamily};
    fill: ${a.pieSectionTextColor};
    font-size:${a.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${a.pieLegendTextColor};
    font-family: ${a.fontFamily};
    font-size: ${a.pieLegendTextSize};
  }
`,"getStyles"),Tt=yt,bt=e((a)=>{let o=[...a.values()].reduce((c,z)=>c+z,0),q=[...a.entries()].map(([c,z])=>({label:c,value:z})).filter((c)=>c.value/o*100>=1);return Si().value((c)=>c.value).sort(null)(q)},"createPieArcs"),At=e((a,o,q,J)=>{t.debug(`rendering pie chart
`+a);let c=J.db,z=r(),T=A(c.getConfig(),z.pie),K=40,l=18,f=4,R=450,W=R,N=_(o),M=N.append("g");M.attr("transform","translate("+W/2+","+R/2+")");let{themeVariables:s}=z,[Q]=ue(s.pieOuterStrokeWidth);Q??=2;let{legendPosition:nt,textPosition:Y}=T,lt=T.donutHole>0&&T.donutHole<=0.9?T.donutHole:0,b=Math.min(W,R)/2-K,st=We().innerRadius(lt*b).outerRadius(b),ct=We().innerRadius(b*Y).outerRadius(b*Y),F=M.append("g");F.append("circle").attr("cx",0).attr("cy",0).attr("r",b+Q/2).attr("class","pieOuterCircle");let P=c.getSections(),dt=bt(P),gt=[s.pie1,s.pie2,s.pie3,s.pie4,s.pie5,s.pie6,s.pie7,s.pie8,s.pie9,s.pie10,s.pie11,s.pie12],I=0;P.forEach((i)=>{I+=i});let tt=dt.filter((i)=>(i.data.value/I*100).toFixed(0)!=="0"),U=Oe(gt).domain([...P.keys()]);F.selectAll("mySlices").data(tt).enter().append("path").attr("d",st).attr("fill",(i)=>U(i.data.label)).attr("class",(i)=>{let n="pieCircle";if(T.highlightSlice==="hover")n+=" highlightedOnHover";else if(T.highlightSlice===i.data.label)n+=" highlighted";return n}),F.selectAll("mySlices").data(tt).enter().append("text").text((i)=>(i.data.value/I*100).toFixed(0)+"%").attr("transform",(i)=>"translate("+ct.centroid(i)+")").style("text-anchor","middle").attr("class","slice");let pt=M.append("text").text(c.getDiagramTitle()).attr("x",0).attr("y",-(R-50)/2).attr("class","pieTitleText"),H=[...P.entries()].map(([i,n])=>({label:i,value:n})),k=M.selectAll(".legend").data(H).enter().append("g").attr("class","legend");k.append("rect").attr("width",l).attr("height",l).style("fill",(i)=>U(i.label)).style("stroke",(i)=>U(i.label)),k.append("text").attr("x",l+f).attr("y",l-f).text((i)=>{if(c.getShowData())return`${i.label} [${i.value}]`;return i.label});let E=Math.max(...k.selectAll("text").nodes().map((i)=>i?.getBoundingClientRect().width??0)),G=R,V=W+K,h=l+f,X=H.length*h;switch(nt){case"center":k.attr("transform",(i,n)=>{let u=h*H.length/2,C=-E/2-(l+f),D=n*h-u;return"translate("+C+","+D+")"});break;case"top":G+=X,k.attr("transform",(i,n)=>{let u=b,C=-E/2-(l+f),D=n*h-u;return`translate(${C}, ${D})`}),F.attr("transform",()=>`translate(0, ${X+h})`);break;case"bottom":G+=X,k.attr("transform",(i,n)=>{let u=-b-h,C=-E/2-(l+f),D=n*h-u;return"translate("+C+","+D+")"});break;case"left":V+=l+f+E,k.attr("transform",(i,n)=>{let u=h*H.length/2,C=-b-(l+f),D=n*h-u;return"translate("+C+","+D+")"}),F.attr("transform",()=>`translate(${E+l+f}, 0)`);break;case"right":default:V+=l+f+E,k.attr("transform",(i,n)=>{let u=h*H.length/2,C=12*l,D=n*h-u;return"translate("+C+","+D+")"});break}let et=pt.node()?.getBoundingClientRect().width??0,ht=W/2-et/2,ft=W/2+et/2,at=Math.min(0,ht),rt=Math.max(V,ft)-at;N.attr("viewBox",`${at} 0 ${rt} ${G}`),S(N,G,rt,T.useMaxWidth)},"draw"),kt={draw:At},Mt={parser:Dt,db:ot,renderer:kt,styles:Tt};export{Mt as diagram};
