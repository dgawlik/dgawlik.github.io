"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3218],{3643:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var i=t(5116),o=t(4848),s=t(8453);const r={title:"My exploration of WASM/WASI",tags:["wasm","microservices","fermyonspin"]},a="Exploration of WASM/WASI",l={authorsImageUrls:[]},c=[{value:"Comparison to JVM",id:"comparison-to-jvm",level:2},{value:"Why bother",id:"why-bother",level:2},{value:"Sandboxing and Formal Verification",id:"sandboxing-and-formal-verification",level:3},{value:"WebAssembly Component Model",id:"webassembly-component-model",level:3},{value:"For now disapointing",id:"for-now-disapointing",level:3},{value:"Conclusion",id:"conclusion",level:3}];function d(e){const n={a:"a",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Assembler was developed in 1947, wow! It makes 78 years of computing development in which we saw higher level programming languages, virtual machine programming languages (write once run everywhere), virtual machines, cloud and so on. A lot of knowledge got accumulated over the time which you can see in size of artifacts deployed to cloud."}),"\n",(0,o.jsxs)(n.p,{children:["Over the years we have seen several attempts reach for the roots. Similarly ",(0,o.jsx)(n.strong,{children:"WebAssembly"})," is instruction format for virtual machine designed to be portable compilation target for any language willing. It is fast as nearly native speed, secure and sandboxed and language agnostic. Originally wrote for the browsers it is beginning to get traction as microservice runtime, which btw is topic of this post."]}),"\n",(0,o.jsx)(n.h2,{id:"comparison-to-jvm",children:"Comparison to JVM"}),"\n",(0,o.jsx)(n.p,{children:"It is obvious that WASM and JVM share similarities as intermediate-represented runtimes. If you have interpreted language then out of necessity you have to have some mechanism to speed things up. For Java\nthere is tiered JIT compiler and Wasm also has JIT however there is also possiblity of Ahead of Time Compilation."}),"\n",(0,o.jsxs)(n.p,{children:["Wasm was designed for ",(0,o.jsx)(n.em,{children:"security, portability, and fast startup"})," and differs in several things from Java.\nFirst of all WASM modules are compact binaries and smaller size means faster loading. Second all the dependencies are pre-bundled and not needed to be loaded dynamically which takes time. And the binary code is already sandboxed which means it does not need to be validated."]}),"\n",(0,o.jsx)(n.p,{children:"But what is most interesting is that WASM bytecode is closer to native binaries than JVM bytecode which means it can be JITed with less effort. Here is why:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"linear memory model similar to C-style pointers"}),"\n",(0,o.jsx)(n.li,{children:"no GC"}),"\n",(0,o.jsx)(n.li,{children:"basic numeric types"}),"\n",(0,o.jsx)(n.li,{children:"assembly like control flow (loops, branches, direct-calls) versus method invocations"}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"It looks like history took whole circle."}),"\n",(0,o.jsx)(n.h2,{id:"why-bother",children:"Why bother"}),"\n",(0,o.jsx)(n.p,{children:"Where Wasm will shine in near future is serverless computing, which is now more or less poinless. Imagine deploying 100MB artifact which will spin up in 5 seconds for only ONE function. But with Wasm and it's promises to start withing 20ms the task takes whole new dimension."}),"\n",(0,o.jsx)(n.p,{children:"And of course cloud is money. And where is money (cost savings) there imo will always be political will to move things forward. I'm pretty sure WebAssembly has bright future, at least for the cloud and edge."}),"\n",(0,o.jsxs)(n.p,{children:["A month ago I watched ",(0,o.jsx)(n.a,{href:"https://www.youtube.com/watch?v=fQdkNGZqYZA",children:"this wasmCloud presentation"})," which was an interesting case for the Edge. Imagine that you run a factory with devices with computing constraints. If the gear is spinning 5000 RPMs you have to take corrective action right now, instead of waiting for server to respond. Wasm can be deployed on such machines (Edge) and take necessary actions of control loop while delegating higher level business functions to cloud."]}),"\n",(0,o.jsx)(n.h3,{id:"sandboxing-and-formal-verification",children:"Sandboxing and Formal Verification"}),"\n",(0,o.jsxs)(n.p,{children:['If computer programs were computationally proven to be correct (formal verification) then there would be no bugs at all. Sandboxing is one step close towards this goal. If you enforce clear boundaries of the system,\nwhich files are used, what is sent on network and so on the security is much easier to reason about without "gaps". And once you have perfectly isolated component without gaps you can use formal tools to actually prove the logic is correct. I found ',(0,o.jsx)(n.a,{href:"https://oa.upm.es/75802/1/TFM_DAVID_MUNUERA_MAZARRO.pdf",children:"something here"})," will take a look in near future."]}),"\n",(0,o.jsx)(n.h3,{id:"webassembly-component-model",children:"WebAssembly Component Model"}),"\n",(0,o.jsxs)(n.p,{children:["So far the application have been run in one-off basis, but standards are emerging which will handle component interactions (microservices). Here is a ",(0,o.jsx)(n.a,{href:"https://component-model.bytecodealliance.org/",children:"summary"}),"."]}),"\n",(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:"Word"}),(0,o.jsx)(n.th,{children:"Definition"})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"component"}),(0,o.jsx)(n.td,{children:"a specially wrapped wasm binary that can interact with other components on clear interfaces"})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"interface"}),(0,o.jsx)(n.td,{children:"a contract between components that is language agnostic"})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"WIT"}),(0,o.jsx)(n.td,{children:"interface defnition langauge that you port with componentized applications"})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"world"}),(0,o.jsx)(n.td,{children:"contract between component and runtime"})]})]})]}),"\n",(0,o.jsxs)(n.p,{children:["So you basically write the functionality in Rust and ",(0,o.jsx)(n.strong,{children:"export"})," functions in Wit. Other component ",(0,o.jsx)(n.strong,{children:"imports"})," (also with WIT) these functions and the serialization/deserialization is handled by runtime. wasmCloud claims to also remotely call the imports which is handled with NATS. Why WIT you may ask? Because wasm primtives are just numbers and strings. For high level functionality you need ",(0,o.jsx)(n.em,{children:"records"}),", ",(0,o.jsx)(n.em,{children:"tuples"}),", ",(0,o.jsx)(n.em,{children:"variants"}),", ",(0,o.jsx)(n.em,{children:"lists"})," and so on."]}),"\n",(0,o.jsx)(n.h3,{id:"for-now-disapointing",children:"For now disapointing"}),"\n",(0,o.jsx)(n.p,{children:"It looks all good but is still in it's nascency. This means you probably won't see library for your use (if you don't write yourself). However there are several runtimes that are under development:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"wasmCloud"}),"\n",(0,o.jsx)(n.li,{children:"fermyon/spin"}),"\n",(0,o.jsx)(n.li,{children:"wasmEdge"}),"\n",(0,o.jsx)(n.li,{children:"WAGI"}),"\n",(0,o.jsx)(n.li,{children:"and more"}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Right now it is hard to host microservices application with WASI other than communicating via http."}),"\n",(0,o.jsxs)(n.p,{children:["I got carried away and wrote some ",(0,o.jsx)(n.a,{href:"https://github.com/vulture-dominiczek/fermyon-spin-eval",children:"number factorization microservice app"}),". Check it out!"]}),"\n",(0,o.jsx)(n.h3,{id:"conclusion",children:"Conclusion"}),"\n",(0,o.jsx)(n.p,{children:"It's worth following the developments, that's for sure. I'm pretty certain that the bright future is ahead for WASM."})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(6540);const o={},s=i.createContext(o);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:n},e.children)}},5116:e=>{e.exports=JSON.parse('{"permalink":"/blog/2025/01/10/","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2025-01-10.md","source":"@site/blog/2025-01-10.md","title":"My exploration of WASM/WASI","description":"Assembler was developed in 1947, wow! It makes 78 years of computing development in which we saw higher level programming languages, virtual machine programming languages (write once run everywhere), virtual machines, cloud and so on. A lot of knowledge got accumulated over the time which you can see in size of artifacts deployed to cloud.","date":"2025-01-10T00:00:00.000Z","tags":[{"inline":true,"label":"wasm","permalink":"/blog/tags/wasm"},{"inline":true,"label":"microservices","permalink":"/blog/tags/microservices"},{"inline":true,"label":"fermyonspin","permalink":"/blog/tags/fermyonspin"}],"readingTime":3.97,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"My exploration of WASM/WASI","tags":["wasm","microservices","fermyonspin"]},"unlisted":false,"nextItem":{"title":"Christmas with Quantum Mechanics","permalink":"/blog/2024/12/29/"}}')}}]);