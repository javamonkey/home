var lang={"zh-cn":{guide:{title:"在线文档",beetl:"Beetl文档",beetlsql:"BeetlSQL文档"},trial:"在线体验",forum:"论坛",download:"下载",dl:[{n:"Beetl模板引擎",u:"http://git.oschina.net/xiandafu/beetl2.0/attach_files"},{n:"BeetlSQL数据库Dao",u:"http://git.oschina.net/xiandafu/beetlsql/attach_files"},{n:"XLSUnit单元测试工具",u:"https://git.oschina.net/xiandafu/xlsunit"}],donate:"捐助作者",sb2:{name:"《Spring Boot2精髓》",fix:"内容勘正",more:"内容补充"},language:"English"},en:{guide:{title:"Guide",beetl:"Beetl Doc",beetlsql:"BeetlSQL Doc"},trial:"Trial",forum:"Forum",download:"Download",dl:[{n:"Beetl Template",u:"http://mvnrepository.com/artifact/com.ibeetl/beetl"},{n:"BeetlSQL Database Dao",u:"http://mvnrepository.com/artifact/com.ibeetl/beetlsql"},{n:"XLSUnit Unit Testing Tool",u:"http://mvnrepository.com/artifact/com.ibeetl/xlsunit"}],donate:"Donate",sb2:{name:"《Spring Boot2揭秘》",fix:"内容勘正",more:"内容补充"},language:"中文"}};
var localize = (localStorage.localize||navigator.language||navigator.browserLanguage).toLowerCase();
if(localize!='zh-cn')localize='en';
var beetl = new Vue({
	el:'#beetl',
	data:{lang:localize,doc:'',nav:[],search:''},
	computed:{
		searchlist:function(){
			return localSearch(this.search,this.nav,[]);
		}
	},
	components:{
		'navmenu':{
			name:'navmenu',
			props: ['list'],
			template: '<transition-group v-if="list.length" tag="ul" appear><li v-for="n of list" :title="n.text" :key="n.text"><a :href="n.href" @click="beetl.jump" v-html="n.text"></a><navmenu  v-if="list.length" :list="n.child"></navmenu></li></transition-group>'
		}
	},
	methods:{
		jump:function(e){
			this.search = '';
			e.preventDefault();
			var top = $(e.target.getAttribute('href')).offset().top-70;
			$(window).scrollTop(top);
		},
		language:function(){this.lang = this.lang=='en'?'zh-cn':'en';localStorage.localize = this.lang;}
	},
	computed:{searchlist:function(){return localSearch(this.search,this.nav,[])},i18n:function(){return lang[this.lang]}}
})
var render = new marked.Renderer(),toc;
render.heading = function(text,level){
	var reg = /^(\d+(_\d+)*).*/.exec(text.replace(/\./g,'_')),tag = '<h'+level;
	if(reg){
		tag += ' id="beetl_'+reg[1]+'" class="_anchor">';
		var current = {href:'#beetl_'+reg[1],level:level,text:text,child:[]}
		addtoc(toc,current,level);
	}else{
		tag += '>';
	}
	tag += text+'</h'+level+'>'
	return tag
}

function addtoc(current,content,level){
	if(level==1||current.length==0||current[current.length-1].level==content.level){
		current.push(content);
	}else{
		addtoc(current[current.length-1].child,content,level-1)
	}
}

function loadDoc(){
	var docs = ['beetl','beetlsql'],doc = location.hash.substr(1)
	if(docs.indexOf(doc)<0) doc = 'beetl';//所有非法的参数都归为beetl
	document.title = beetl.i18n.guide[doc];
	toc=[];
	$(window).scrollTop(0)
	NProgress.start();
	$.get(doc+'.md?_='+new Date().getDay(),function(md){
		marked(md,
			{renderer:render,highlight:function(code,lang){return hljs.highlightAuto(code).value}},
			function(err,html){
				beetl.search='';
//				beetl.type = doc;
				beetl.doc = html;
				Vue.set(beetl,'nav',toc);
				NProgress.done();
			}
		)
	})
}
$(window).on('scroll',_.throttle(function(){
	var _win =$(window),_winST =  _win.scrollTop(),_winH = _win.height(),prev;
	$('#nav .active').removeClass('active')
	$('._anchor').each(function(i,n){
		if(_winST<=this.offsetTop){
			var _id = prev&&_winST+_winH*2/3<this.offsetTop?prev.id:this.id;
			var current = $('#nav a[href="#'+_id+'"]').addClass('active');
			var container = $('#nav');
			container.stop().animate({scrollTop:current.offset().top - container.offset().top + container.scrollTop() - (container.height()-current.height())/2},'fast');
			return false;
		}
		prev = this;
	})
},300)).on('resize',function(){
	$(this).trigger('scroll');
}).on('hashchange',loadDoc)
function localSearch(search,nav,arr){
	try{
		var reg = new RegExp(search,'i')
		nav.forEach(function(n){
			if(n.text.match(reg)) arr.push(n);
			if(n.child.length) localSearch(search,n.child,arr);
		})
	}catch(e){
		
	}
	return arr;
}
loadDoc();
