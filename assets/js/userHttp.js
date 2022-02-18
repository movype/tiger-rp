function UserHttp(){this.login=function(token){Cookies.set('token',token.token,{expires:7});user=jwt_decode(token.token);Cookies.set('user',user,{expires:7});this.setAuth();}
this.logout=function(){Cookies.remove('token');Cookies.remove('user');this.setAuth();}
this.getUser=function(){return Cookies.get('user')?JSON.parse(Cookies.get('user')):false;}
this.isLogged=function(){return Cookies.get('user')?true:false;}
this.setAuth=function(){if(this.isLogged()){$('body').removeClass('isUnregUser');$('.accountPopupReg_accName span').text(this.getUser().username);$('.accountPopupReg_accEmail').text(this.getUser().email);setAccessServers(this.getUser().clientId);}
else{runCustomSelect('customSelectGallery');$('body').addClass('isUnregUser');}
$('.sideMenuContainer').css({padding:'1px'});$('.sideMenuContainer').css({padding:'0'});}
this.checkAuth=function(){if(this.isLogged()){$.ajax({type:'POST',url:'https://webclient.gamecluster.nextrp.ru/refresh-token',data:{refreshToken:Cookies.get('refreshToken')},success:(data)=>{console.log(data)
this.login({token:data.data.token,refreshToken:data.data.refreshToken});},error:(err)=>{console.log(err.status);console.log(err.responseJSON);if(err.status==403||err.status==404){this.logout();}}});}
else{runCustomSelect('customSelectGallery');$('body').addClass('isUnregUser');}
$('.sideMenuContainer').css({padding:'1px'});$('.sideMenuContainer').css({padding:'0'});}
function setAccessServers(clientId){$.get(`https://webclient.gamecluster.nextrp.ru/user/${clientId}/servers`,(data)=>{if($('.serverInput').text()==''){let serversListData='';serversListData+='<option value="">Выберите сервер</option>';for(let i=0;i<data.data.length;i++){serversListData+='<option value="'+data.data[i].id+'">'+data.data[i].name+'</option>';}
$('.serverInput').append(serversListData);runCustomSelect('customSelect');if(!$('.customSelectGallery').hasClass('select-hidden'))
runCustomSelect('customSelectGallery');}});}
const runCustomSelect=function(target){$(`.${target}`).each(function(){var $this=$(this),numberOfOptions=$(this).children('option').length;$this.addClass('select-hidden');$this.wrap('<div class="select"></div>');$this.after('<div class="select-styled"></div>');var $styledSelect=$this.next('div.select-styled');$styledSelect.text($this.children('option').eq(0).text());var $list=$('<ul />',{'class':'select-options'}).insertAfter($styledSelect);for(var i=0;i<numberOfOptions;i++){$('<li />',{text:$this.children('option').eq(i).text(),rel:$this.children('option').eq(i).val(),'data-galleryfilter':$this.children('option').eq(i).attr('data-galleryfilter')}).appendTo($list);}
var $listItems=$list.children('li');$styledSelect.click(function(e){e.stopPropagation();$('div.select-styled.active').not(this).each(function(){$(this).removeClass('active').next('ul.select-options').hide();});$(this).toggleClass('active').next('ul.select-options').toggle();$(this).closest('.customSelectContainer').removeClass('invalidInput')});$listItems.click(function(e){e.stopPropagation();$styledSelect.text($(this).text()).removeClass('active');$this.val($(this).attr('rel'));if($this.hasClass('isGalleryFilter')){gallery.generateGallery($(this).attr('data-galleryfilter'));}
$list.hide();});$(document).click(function(){$styledSelect.removeClass('active');$list.hide();});$('.select-options').overlayScrollbars({});});}}