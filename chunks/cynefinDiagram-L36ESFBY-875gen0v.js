import{L}from"./main-18ys0d8m.js";import{e,t,J,x,u,S,d,p,m,g,y,w,v,A,_}from"./main-r27nhh20.js";import{O}from"./main-cqqyjtr2.js";var xt=e(()=>({domains:new Map,transitions:[]}),"createDefaultData"),at=xt(),Mt=e(()=>at.domains,"getDomains"),zt=e(()=>at.transitions,"getTransitions"),Lt=e((n)=>{if(!n)return;for(let o of n){let a=o.domain,r=(o.items??[]).map((l)=>({label:l.label}));at.domains.set(a,{name:a,items:r})}},"setDomains"),Nt=e((n)=>{if(!n)return;at.transitions=n.filter((o)=>{if(o.from===o.to)return t.warn(`Cynefin: self-loop transition on domain "${o.from}" is not meaningful and will be skipped.`),!1;return!0}).map((o)=>({from:o.from,to:o.to,label:o.label||void 0}))},"setTransitions"),Pt=e(()=>A({...x.cynefin,...u().cynefin}),"getConfig"),It=e(()=>{d(),at=xt()},"clear"),st={getDomains:Mt,getTransitions:zt,setDomains:Lt,setTransitions:Nt,getConfig:Pt,clear:It,setAccTitle:p,getAccTitle:m,setDiagramTitle:w,getDiagramTitle:v,getAccDescription:y,setAccDescription:g},Wt=e((n)=>{L(n,st),st.setDomains(n.domains),st.setTransitions(n.transitions)},"populate"),Rt={parse:e(async(n)=>{let o=await O("cynefin",n);t.debug(o),Wt(o)},"parse")};function ot(n){let o=n+1831565813|0;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}e(ot,"seededRandom");function $t(n){let o=0;for(let a=0;a<n.length;a++){let r=n.charCodeAt(a);o=(o<<5)-o+r,o|=0}return o}e($t,"hashString");function bt(n,o){if(typeof n==="number"&&Number.isFinite(n)&&n!==0)return n;return $t(o)}e(bt,"resolveSeed");function wt(n,o,a,r){let l=n/2,C=r??n*0.015,rt=7,Z=o/7,h=[];for(let i=0;i<=7;i++){let D=ot(a+i*17)*C*2-C;h.push({x:l+D,y:i*Z})}let R=`M${h[0].x},${h[0].y}`;for(let i=0;i<h.length-1;i++){let D=h[i],c=h[i+1],b=(D.y+c.y)/2,P=i%2===0?1:-1,B=C*1.5*P*ot(a+i*31+7),K=D.x+B,tt=b,et=c.x-B;R+=` C${K},${tt} ${et},${b} ${c.x},${c.y}`}return R}e(wt,"generateFoldPath");function Ct(n,o,a,r){let l=o/2,C=r??o*0.015,rt=7,Z=n/7,h=[];for(let i=0;i<=7;i++){let D=ot(a+i*23)*C*2-C;h.push({x:i*Z,y:l+D})}let R=`M${h[0].x},${h[0].y}`;for(let i=0;i<h.length-1;i++){let D=h[i],c=h[i+1],b=(D.x+c.x)/2,P=i%2===0?1:-1,B=C*1.5*P*ot(a+i*37+11),K=b,tt=D.y+B,et=b,X=c.y-B;R+=` C${K},${tt} ${et},${X} ${c.x},${c.y}`}return R}e(Ct,"generateHorizontalBoundary");function vt(n,o){let a=n/2,r=o*0.5,l=o,C=n*0.03;return[`M${a},${r}`,`C${a+C},${r+(l-r)*0.2}`,`${a-C*1.5},${r+(l-r)*0.55}`,`${a+C*0.5},${r+(l-r)*0.75}`,`C${a-C},${r+(l-r)*0.85}`,`${a+C*0.3},${r+(l-r)*0.95}`,`${a},${l}`].join(" ")}e(vt,"generateCliffPath");function Dt(n,o,a,r){return[`M${n-a},${o}`,`A${a},${r} 0 1,1 ${n+a},${o}`,`A${a},${r} 0 1,1 ${n-a},${o}`,"Z"].join(" ")}e(Dt,"generateConfusionPath");var ht={complex:{model:"Probe → Sense → Respond",practice:"Emergent Practices"},complicated:{model:"Sense → Analyse → Respond",practice:"Good Practices"},clear:{model:"Sense → Categorise → Respond",practice:"Best Practices"},chaotic:{model:"Act → Sense → Respond",practice:"Novel Practices"},confusion:{model:"",practice:"Disorder"}},Ft=e((n,o)=>{let a=n/2,r=o/2;return{complex:{cx:a/2,cy:r/2,x:0,y:0,w:a,h:r},complicated:{cx:a+a/2,cy:r/2,x:a,y:0,w:a,h:r},chaotic:{cx:a/2,cy:r+r/2,x:0,y:r,w:a,h:r},clear:{cx:a+a/2,cy:r+r/2,x:a,y:r,w:a,h:r},confusion:{cx:a,cy:r,x:a*0.7,y:r*0.7,w:a*0.6,h:r*0.6}}},"getDomainLayouts"),Vt=e(()=>{let n=J(),o=u();return A(n,o.themeVariables).cynefin},"getCynefinDomainColors"),dt=3,_t=e((n,o,a,r)=>{let l=r.db,C=l.getDomains(),rt=l.getTransitions(),Z=l.getDiagramTitle(),h=l.getAccTitle(),R=l.getAccDescription(),i=l.getConfig(),D=Vt();t.debug("Rendering Cynefin diagram");let{width:c,height:b,padding:P,showDomainDescriptions:B,boundaryAmplitude:K}=i,tt=c+P*2,et=b+P*2,X={complex:D.complexBg,complicated:D.complicatedBg,clear:D.clearBg,chaotic:D.chaoticBg,confusion:D.confusionBg},F=_(o);if(S(F,et,tt,i.useMaxWidth??!0),F.attr("viewBox",`0 0 ${tt} ${et}`),h)F.append("title").text(h);if(R)F.append("desc").text(R);let V=F.append("g").attr("transform",`translate(${P}, ${P})`),nt=Ft(c,b),ft=bt(i.seed,o),kt=V.append("g").attr("class","cynefin-backgrounds"),ct=["complex","complicated","chaotic","clear"];for(let f of ct){let s=nt[f];kt.append("rect").attr("class","cynefinDomain").attr("x",s.x).attr("y",s.y).attr("width",s.w).attr("height",s.h).attr("fill",X[f]).attr("fill-opacity",0.4).attr("stroke","none")}let lt=V.append("g").attr("class","cynefin-boundaries");lt.append("path").attr("class","cynefinBoundary").attr("d",wt(c,b,ft,K)).attr("fill","none"),lt.append("path").attr("class","cynefinBoundary").attr("d",Ct(c,b,ft+100,K)).attr("fill","none"),lt.append("path").attr("class","cynefinCliff").attr("d",vt(c,b)).attr("fill","none");let Tt=c*0.15,At=b*0.15;V.append("path").attr("class","cynefinConfusion").attr("d",Dt(c/2,b/2,Tt,At)).attr("fill",X.confusion).attr("fill-opacity",0.5);let mt=V.append("g").attr("class","cynefin-labels");for(let f of ct){let s=nt[f];mt.append("text").attr("class","cynefinDomainLabel").attr("x",s.cx).attr("y",B?s.cy-30:s.cy).attr("text-anchor","middle").attr("dominant-baseline","middle").text(f.charAt(0).toUpperCase()+f.slice(1))}if(mt.append("text").attr("class","cynefinDomainLabel").attr("x",c/2).attr("y",B?b/2-10:b/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text("Confusion"),B){let f=V.append("g").attr("class","cynefin-subtitles");for(let s of ct){let T=nt[s],k=ht[s];f.append("text").attr("class","cynefinSubtitle").attr("x",T.cx).attr("y",T.cy-10).attr("text-anchor","middle").attr("dominant-baseline","middle").text(k.model),f.append("text").attr("class","cynefinSubtitle").attr("x",T.cx).attr("y",T.cy+5).attr("text-anchor","middle").attr("dominant-baseline","middle").text(k.practice)}f.append("text").attr("class","cynefinSubtitle").attr("x",c/2).attr("y",b/2+8).attr("text-anchor","middle").attr("dominant-baseline","middle").text(ht.confusion.practice)}let pt=V.append("g").attr("class","cynefin-items"),E=26,yt=10,Bt=["complex","complicated","chaotic","clear","confusion"];for(let f of Bt){let s=C.get(f);if(!s||s.items.length===0)continue;let T=nt[f],k=f==="confusion",j=s.items,q=0;if(k&&s.items.length>dt)q=s.items.length-dt,j=s.items.slice(0,dt);let H;if(k){let z=B?22:14;H=T.cy+z}else H=T.cy+(B?25:15);if([...j].forEach((z,G)=>{let I=H+G*(E+4),Y=pt.append("g"),U=Y.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",E/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(z.label),N=z.label.length*7,M=U.node();if(M&&typeof M.getBBox==="function"){let it=M.getBBox();if(it.width>0)N=it.width}let W=N+yt*2,Q=T.cx-W/2;Y.attr("transform",`translate(${Q}, ${I})`),Y.insert("rect","text").attr("class","cynefinItem").attr("x",0).attr("y",0).attr("width",W).attr("height",E).attr("rx",4).attr("ry",4).attr("fill",X[f]).attr("fill-opacity",0.95),U.attr("x",W/2).attr("y",E/2)}),q>0){let z=H+j.length*(E+4),G=`+${q} more`,I=pt.append("g"),Y=I.append("text").attr("class","cynefinItemText").attr("x",0).attr("y",E/2).attr("text-anchor","middle").attr("dominant-baseline","central").text(G),U=G.length*7,N=Y.node();if(N&&typeof N.getBBox==="function"){let Q=N.getBBox();if(Q.width>0)U=Q.width}let M=U+yt*2,W=T.cx-M/2;I.attr("transform",`translate(${W}, ${z})`),I.insert("rect","text").attr("class","cynefinItemOverflow").attr("x",0).attr("y",0).attr("width",M).attr("height",E).attr("rx",4).attr("ry",4).attr("fill",X[f]).attr("fill-opacity",0.6),Y.attr("x",M/2).attr("y",E/2)}}if(rt.length>0){let f=F.select("defs").empty()?F.append("defs"):F.select("defs"),s=`cynefin-arrow-${o}`;f.append("marker").attr("id",s).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto-start-reverse").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("class","cynefinArrowHead");let T=V.append("g").attr("class","cynefin-arrows");rt.forEach((k)=>{let j=nt[k.from],q=nt[k.to];if(!j||!q)return;if(k.from===k.to){t.warn(`Cynefin renderer: skipping self-loop on domain "${k.from}"`);return}let{cx:H,cy:z}=j,{cx:G,cy:I}=q,Y=(H+G)/2,U=(z+I)/2,N=G-H,M=I-z,W=Math.sqrt(N*N+M*M),Q=W*0.15,it=-M/W,St=N/W,ut=Y+it*Q,gt=U+St*Q;if(T.append("path").attr("class","cynefinArrowLine").attr("d",`M${H},${z} Q${ut},${gt} ${G},${I}`).attr("fill","none").attr("marker-end",`url(#${s})`),k.label)T.append("text").attr("class","cynefinArrowLabel").attr("x",ut).attr("y",gt-6).attr("text-anchor","middle").attr("dominant-baseline","auto").text(k.label)})}if(Z)V.append("text").attr("class","cynefinTitle").attr("x",c/2).attr("y",-P/2).attr("text-anchor","middle").attr("dominant-baseline","middle").text(Z)},"draw"),Et={draw:_t},Ht=e(()=>{let n=J(),o=u();return A(n,o.themeVariables).cynefin},"getCynefinTheme"),Gt=e(()=>{let n=Ht();return`
	.cynefinDomain {
		stroke: none;
	}
	.cynefinDomainLabel {
		font-size: ${n.domainFontSize}px;
		font-weight: bold;
		fill: ${n.labelColor};
	}
	.cynefinSubtitle {
		font-size: ${n.itemFontSize-1}px;
		fill: ${n.textColor};
		font-style: italic;
	}
	.cynefinItem {
		fill-opacity: 0.95;
		stroke: ${n.boundaryColor};
		stroke-width: 1;
	}
	.cynefinItemText {
		font-size: ${n.itemFontSize}px;
		fill: ${n.textColor};
	}
	.cynefinItemOverflow {
		fill-opacity: 0.6;
		stroke: ${n.boundaryColor};
		stroke-width: 1;
		stroke-dasharray: 3 2;
	}
	.cynefinBoundary {
		stroke: ${n.boundaryColor};
		stroke-width: ${n.boundaryWidth};
		stroke-dasharray: 6 3;
	}
	.cynefinCliff {
		stroke: ${n.cliffColor};
		stroke-width: ${n.cliffWidth};
	}
	.cynefinConfusion {
		stroke: ${n.boundaryColor};
		stroke-width: 1.5;
		stroke-dasharray: 4 2;
	}
	.cynefinArrowLine {
		stroke: ${n.arrowColor};
		stroke-width: ${n.arrowWidth};
		fill: none;
	}
	.cynefinArrowHead {
		fill: ${n.arrowColor};
		stroke: none;
	}
	.cynefinArrowLabel {
		font-size: ${n.itemFontSize-1}px;
		fill: ${n.textColor};
	}
	.cynefinTitle {
		font-size: ${n.domainFontSize+2}px;
		font-weight: bold;
		fill: ${n.labelColor};
	}
	`},"styles"),Yt=Gt,Jt={parser:Rt,db:st,renderer:Et,styles:Yt};export{Jt as diagram};
