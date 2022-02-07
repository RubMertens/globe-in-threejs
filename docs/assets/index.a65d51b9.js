import{S as M,P as b,D as N,a as v,b as u,T as P,M as f,A as L,B as G,W as V,G as B,c as F,d as A,F as T,e as W,g as j}from"./vendor.ce2910ae.js";const z=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}};z();var C=`\r
varying vec2 vertexUV;\r
varying vec3 vertexNormal;\r
\r
void main(){\r
    vertexUV = uv;\r
    vertexNormal = normalize(normalMatrix *normal );\r
    gl_Position = projectionMatrix* modelViewMatrix * vec4(position,1);\r
} `,U=`\r
uniform sampler2D globeTexture;\r
\r
varying vec2 vertexUV;\r
varying vec3 vertexNormal;\r
\r
void main(){\r
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0,0.0,1.0));\r
    vec3 atmosphere = vec3(0.3,0.6,1.0)* pow(intensity, 1.5);\r
    gl_FragColor = vec4(atmosphere+ texture2D(globeTexture, vertexUV).xyz, 1);\r
} `,D=`\r
varying vec3 vertexNormal;\r
\r
void main(){\r
    vertexNormal = normalize(normalMatrix *normal );\r
    gl_Position = projectionMatrix* modelViewMatrix * vec4(position,1);\r
} `,E=`\r
varying vec3 vertexNormal;\r
\r
void main(){\r
    float intensity = pow(0.65- dot(vertexNormal , vec3(0.0,0.0,1.0)), 2.0);\r
    gl_FragColor = vec4(0.3,0.6,1.0,1.0)*intensity;\r
} `,O="/globe-in-threejs/assets/earth.6886fa78.jpg";const s=document.getElementById("globe-container"),a=new M,_=s.offsetWidth/s.offsetHeight,g=new b(75,_,.01,1e3);g.position.set(0,0,200);const h=new N("white",1);h.position.set(0,10,10);a.add(h);const H=new v(50,50,50),I=new u({vertexShader:C,fragmentShader:U,uniforms:{globeTexture:{value:new P().load(O)}}}),p=new f(H,I),x=new v(50,50,50);x.scale(1.1,1.1,1.1);const R=new u({vertexShader:D,fragmentShader:E,blending:L,side:G}),q=new f(x,R);a.add(q);const d=new V({antialias:!0,canvas:document.getElementById("globe")});d.setPixelRatio(devicePixelRatio);d.setSize(s.offsetWidth,s.offsetHeight);const c={x:0,y:0};addEventListener("mousemove",n=>{const r=n.clientX/window.innerWidth*2-1,o=-(n.clientY/window.innerHeight)*2+1;c.x=r,c.y=o});const m=new B;m.add(p);a.add(m);const y=new F,k=new A({color:"white"}),w=[];for(let n=0;n<1e4;n++){const r=2e3,o=(Math.random()-.5)*r,i=(Math.random()-.5)*r,e=-Math.random()*r;w.push(o,i,e)}y.setAttribute("position",new T(w,3));const K=new W(y,k);a.add(K);function S(){requestAnimationFrame(S),d.render(a,g),p.rotation.y+=.003,j.to(m.rotation,{y:c.x*.3,x:-c.y*.5,duration:2})}S();
