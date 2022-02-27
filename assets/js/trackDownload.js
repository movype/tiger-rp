$(document).ready(function(){const api='https://api.nextrp.ru';var qs=(function(a){if(a==''){return{}}
var b={}
for(var i=0;i<a.length;++i){var p=a[i].split('=',2)
if(p.length==1){b[p[0]]=''}else{b[p[0]]=decodeURIComponent(p[1].replace(/\+/g,' '))}}
return b})(window.location.search.substr(1).split('&'))
if(!Cookies.get('initQuery')&&!(Object.keys(qs).includes('clientId')&&Object.keys(qs).length==1)){Cookies.set('initQuery',JSON.stringify(qs),{'path':'/'})
if(window.location.search!==''){window.location.href='/'}}
if(qs['utm_source']!='youtube'&&(qs['source']=='vk'||qs['source']=='d'||qs['source']=='d1'||qs['source']=='a'||qs['source']=='a1'||qs['source']=='yt')){Cookies.set('bundleVersion',qs['source'],{'path':'/'})}
if(qs['utm_source']=='youtube'){Cookies.set('bundleVersion','yt',{'path':'/'})}
trackDownload=()=>{reachGoal('launcher_download')
const bundle=Cookies.get('bundleVersion')||null;const suffix=bundle?`-${bundle.replace(/\d/g,'')}`:'';window.location.href=`Уппс, лаунчер еще не готов!${suffix}.apk`}
reachGoal=(goal)=>{let reachedGoals=JSON.parse(window.localStorage.getItem('reachedGoals'))||{}
if(reachedGoals[goal]!==true){if(window.dataLayer){const tagManagerArgs={dataLayer:{category:'event',event:goal,action:goal},}
window.dataLayer.push(tagManagerArgs.dataLayer)}
for(let key in window){if(new RegExp(/yaCounter/).test(key)){window[key].reachGoal(goal)}}
reachedGoals[goal]=true
window.localStorage.setItem('reachedGoals',JSON.stringify(reachedGoals))}}});
