'use strict';

var f=class{constructor(e){this.ImmuterGlobalConfig=e;}get not(){return {freeze:()=>{this.ImmuterGlobalConfig.setGlobalConfig(!0),this.ImmuterGlobalConfig.setFreezeConfig(!1);}}}freeze(){this.ImmuterGlobalConfig.setGlobalConfig(!0),this.ImmuterGlobalConfig.setFreezeConfig(!0);}};var a=class{constructor(e){this.next=e;}handleNext(e,t){return this.next?this.next.handle(e,t):e}};var r=class{static check(e){let t=Reflect.apply(Object.prototype.toString,e,[]);return t.slice(t.indexOf(" ")+1,t.indexOf("]")).toLowerCase()}static isDate(e){return this.check(e)==="date"}static isObject(e){return this.check(e)==="object"}static isArray(e){return Array.isArray(e)}static isMap(e){return this.check(e)==="map"}static isSet(e){return this.check(e)==="set"}};var h=class extends a{handle(e,t){return r.isArray(e)?this.createCloneOf(e,t):this.handleNext(e,t)}createCloneOf(e,t){return e.map(t)}};var x=class extends a{handle(e,t){return r.isDate(e)?new Date(e):this.handleNext(e,t)}};var b=class extends Error{constructor(e){super(e),this.name="CloneExceptionError";}};var p=class{static execute(e,t){try{return this.performClone(e,t)}catch(o){if(o instanceof Error)throw new b(o.message)}}static performClone(e,t){let o=this.createCloneOf(e),c=this.propertyDescriptorsOf(e);for(let u of Reflect.ownKeys(c))this.isEligibleToAssign(c,u)&&(o[u]=t(Reflect.get(o,u)));return o}static createCloneOf(e){return Object.create(this.prototypeOf(e),this.propertyDescriptorsOf(e))}static prototypeOf(e){return Object.getPrototypeOf(e)}static propertyDescriptorsOf(e){return Object.getOwnPropertyDescriptors(e)}static isEligibleToAssign(e,t){return e[String(t)]&&Reflect.has(e[String(t)],"value")}};var C=class extends a{handle(e,t){return r.isObject(e)?p.execute(e,t):this.handleNext(e,t)}};var d=class extends a{handle(e,t){return r.isMap(e)?this.createCloneOf(e,t):this.handleNext(e,t)}createCloneOf(e,t){let o=new Map(e);return e.forEach((c,u)=>o.set(u,t(c))),o}};var m=class extends a{handle(e,t){return r.isSet(e)?this.createCloneOf(e,t):this.handleNext(e,t)}createCloneOf(e,t){let o=new Set(e);return e.forEach(c=>o.add(t(c))),o}};var i=class{static execute(e){if(!this.recursivelyHandler){let t=new C,o=new h(t),c=new d(o),u=new m(c),B=new x(u);this.recursivelyHandler=B;}return this.recursivelyHandler.handle(e,this.execute.bind(this))}};var s=class{constructor(e){this.next=e;}handleNext(e,t){return this.next?this.next.handle(e,t):e}freeze(e){return Object.freeze(e)}};var k=class extends s{handle(e,t){return r.isArray(e)?this.freeze(this.createCloneOf(i.execute(e),t)):this.handleNext(e,t)}createCloneOf(e,t){return e.map(t)}};var w=class extends Error{constructor(){super("Cannot assign to immutable Map"),this.name="CannotAssignToImmutableMapError";}};var S=class extends s{handle(e,t){return r.isMap(e)?this.freezeMap(e):this.handleNext(e,t)}freezeMap(e){return e.set=this.throwError,e.delete=this.throwError,e.clear=this.throwError,this.freeze(e)}throwError(){throw new w}};var v=class extends s{handle(e,t){return r.isObject(e)?this.freeze(p.execute(i.execute(e),t)):this.handleNext(e,t)}};var y=class extends Error{constructor(){super("Cannot assign to immutable Set"),this.name="CannotAssignToImmutableSetError";}};var T=class extends s{handle(e,t){return r.isSet(e)?this.freezeSet(e):this.handleNext(e,t)}freezeSet(e){return e.add=this.throwError,e.delete=this.throwError,e.clear=this.throwError,this.freeze(e)}throwError(){throw new y}};var g=class extends s{handle(e,t){return r.isDate(e)?this.freeze(i.execute(e)):this.handleNext(e,t)}};var z=class{static execute(e){if(!this.recursivelyHandler){let t=new T,o=new S(t),c=new v(o),u=new k(c),B=new g(u);this.recursivelyHandler=B;}return this.recursivelyHandler.handle(e,this.execute.bind(this))}};var E=class{static execute(e,t){t(e);}};var l=class l{static setGlobalConfig(e){this.config.global=e;}static setFreezeConfig(e){this.config.freeze=e;}static get global(){return this.globalImmuterConfig}static get not(){return {freeze:this.setFreeze(!1)}}static setFreeze(e){return this.config.freeze=e,{clone:this.clone.bind(this),produce:this.produce.bind(this)}}static clone(e){let t=i.execute(e);return this.execute(t)}static execute(e){let t=this.freezeIfNecessary(e);return l.resetFreezeConfig(),t}static freezeIfNecessary(e){return l.config.freeze?z.execute(e):e}static resetFreezeConfig(){this.config.global?this.setFreeze(!1):this.setFreeze(!0);}static produce(e,t){let o=i.execute(e);return E.execute(o,t),this.execute(o)}};l.config={freeze:!0,global:!1},l.globalImmuterConfig=new f({setFreezeConfig:l.setFreezeConfig.bind(l),setGlobalConfig:l.setGlobalConfig.bind(l)});var F=l;

exports.Immuter = F;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map