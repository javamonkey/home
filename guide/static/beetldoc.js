var guide = new Vue({
	el:'#guide',
	data:{type:'',doc:'',nav:[],search:''},
	computed:{
		searchlist:function(){
			return localSearch(this.search,this.nav,[]);
		}
	},
	components:{
		'navmenu':{
			name:'navmenu',
			props: ['list'],
			template: '<ul v-if="list.length"><li v-for="n of list" :title="n.text"><a :href="n.href" @click="guide.jump" v-html="n.text"></a><navmenu  v-if="list.length" :list="n.child"></navmenu></li></ul>'
		}
	},
	methods:{
		jump:function(e){
			this.search = '';
			e.preventDefault();
			$(window).scrollTop($($(e.target).attr('href')).offset().top);
		}
	}
})
var render = new marked.Renderer(),toc;
render.heading = function(text,level){
	var reg = /^((\d+_)+).*/.exec(text.replace(/\./g,'_')),tag = '<h'+level;
	if(reg){
		tag += ' id="beetl_'+reg[1]+'" class="_anchor">';
		var current = {href:'#beetl_'+reg[1],text:text,child:[]}
		if(level == 3){
			toc.push(current)
		}else if(level == 4){
			toc[toc.length -1].child.push(current)
		}else if(level ==5){
			toc[toc.length -1].child[toc[toc.length -1].child.length-1].child.push(current)
		}
	}else{
		tag += '>';
	}
	tag += text+'</h'+level+'>'
	return tag
}
function loadDoc(){
	var docs = ['beetl','beetlsql'],doc = location.hash.substr(1)
	if(docs.indexOf(doc)<0) doc = 'beetl';//所有非法的参数都归为beetl
	document.title = doc+'中文手册';
	toc=[];
	$(window).scrollTop(0)
	NProgress.start();
	$.get(doc+'.md?_='+new Date().getDay(),function(md){
		marked(md,
			{renderer:render,highlight:function(code,lang){return hljs.highlightAuto(code).value}},
			function(err,html){
				guide.search='';
				guide.type = doc;
				guide.doc = html;
				Vue.set(guide,'nav',toc);
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
