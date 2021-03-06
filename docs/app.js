ax5.dom.ready(function(){

	if(ax5.info.browser == "ie" && ax5.info.version < 9){
		alert("본 페이지는 IE9+ 부터 사용할 수 있습니다. 브라우저를 교체하세요");
	}


	if (!window.app_visual) window.app_visual = ax5.dom.get("#app-visual");
	if (!window.app_nav_left) window.app_nav_left = ax5.dom.get("#app-nav-left");
	//if(window.app) return;
	window.app = (function(){
		prettyPrint();

		var util = ax5.util, dom = ax5.dom;
		var po = [], prev_tag, menu_items = dom("[data-menu-item]"), el, el_name;
		var menu_list = [];

		for(var i= 0,l=menu_items.elements.length;i<l;i++){
			el = menu_items.elements[i];

			if(el.tagName == "H1" && po.length > 0){
				if(prev_tag == "H2" || prev_tag == "H3") po.push("</ul>");
				po.push('</ul>');
			}
			if(el.tagName == "H1") {
				po.push('<ul class="H1">');
			}
			if((el.tagName == "H2" || el.tagName == "H3") && prev_tag == "H1") {
				po.push('<ul class="H2">');
			}
			if(el.tagName == "LABEL") {
				if(prev_tag == "H1") po.push('<ul class="H2">');
				po.push('<li class="menu-label">' + el.innerHTML + '</li>');
				prev_tag = el.tagName;
			}else{
				el_name = dom.attr(el, "data-menu-item");

				menu_list.push({
					id: el_name,
					top: dom.offset(el).top
				});
				dom.before(el, '<div style="position:relative;left:0px;top:-75px;" id="'+ el_name +'"></div>');
				po.push('<li id="menu-'+ el_name +'"><a href="#' + el_name + '">' + el.innerHTML + '</a></li>');
				prev_tag = el.tagName;
			}
		}
		po.push("</ul>");
		dom("#app-nav-left").html('<div class="nav-block">' + po.join('') + '</div>');

		for(var i= 0,l=menu_list.length;i<l;i++){
			menu_list[i].el = dom("#menu-" + menu_list[i].id);
		}

		var selected_menu_list_index = -1;
		var window_height = dom(window).height();
		var nav_left_on = false;

		dom.on(app_nav_left, "mouseover", function(){
			nav_left_on = true;
		});
		dom.on(app_nav_left, "mouseout", function(){
			nav_left_on = false;
		});
		dom.on(app_nav_left, "click", function(){
			setTimeout(function() {
				app.menu_taping(true);
			}, 100);
		});

		return {
			menu_list: menu_list,
			set_menu_height: function(){
				window_height = dom(window).height();
				dom.css(app_nav_left, {"height":ax5.dom.height(window) - 60});
			},
			menu_taping: function(opt){
				if(typeof opt === "undefined" && nav_left_on) return false;
				var s_top = ax5.dom.scroll().top, _i = null;
				for(var i= 0,l=menu_list.length;i<l;i++){
					if( menu_list[i].top + ((i < l-1) ? menu_list[i+1].top - menu_list[i].top - window_height/3 : 0) > s_top){
						_i = i;
						break;
					}
				}
				if(_i == null) _i = menu_list.length-1;
				if(selected_menu_list_index > -1) {
					menu_list[selected_menu_list_index].el.class_name("remove", "open");
					menu_list[selected_menu_list_index].el.parent({tagname:"ul", clazz:"H1"}).class_name("remove", "open");
				}
				menu_list[_i].el.class_name("add", "open");
				menu_list[_i].el.parent({tagname:"ul", clazz:"H1"}).class_name("add", "open");

				var nav_height = ax5.dom.height(app_nav_left[0]),
					nav_sc_top = app_nav_left[0].scrollTop,
					el_top = menu_list[_i].el.position().top + 40;
				if(nav_height + nav_sc_top < el_top){
					app_nav_left[0].scrollTop = el_top - nav_height;
				}
				else if(nav_sc_top > el_top - 40){
					app_nav_left[0].scrollTop = el_top - 40;
				}

				selected_menu_list_index = _i;
			},
			onscroll: function(){
				var s_top = ax5.dom.scroll().top;
				if(s_top >= 220){
					ax5.dom.class_name(app_visual, "add", ["pinned","scrolled"]);
					ax5.dom.class_name(app_nav_left, "add", "pinned");
				}
				else{
					ax5.dom.class_name(app_nav_left, "remove", "pinned");
					if (s_top < 60) {
						ax5.dom.class_name(app_visual, "remove", ["scrolled","pinned"]);
					}
					else
					{
						ax5.dom.class_name(app_visual, "add", "scrolled");
						ax5.dom.class_name(app_visual, "remove", "pinned");
					}
				}
			}
		};
	})();
	app.set_menu_height();
	app.menu_taping();
	app.onscroll();

	if (app.resize_timeout) clearTimeout(app.resize_timeout);
	app.resize_timeout = setTimeout(function(){
		//$(window).resize();
		AXInput.alignAllAnchor();
		AXSelect.alignAllAnchor();
	}, 1000);
});

ax5.dom.resize(function(){
	app.set_menu_height();
	app.menu_taping();
});

ax5.dom.scroll(function() {
	if (!window.app_visual) window.app_visual = ax5.dom.get("#app-visual");
	if (!window.app_nav_left) window.app_nav_left = ax5.dom.get("#app-nav-left");
	app.onscroll();
	if(!ax5.info.browser.mobile) {
		if (app.timeout) clearTimeout(app.timeout);
		app.timeout = setTimeout(function () {
			app.menu_taping();
		}, 1);

		if (app.resize_timeout) clearTimeout(app.resize_timeout);
		app.resize_timeout = setTimeout(function(){
			//$(window).resize();
			AXInput.alignAllAnchor();
			AXSelect.alignAllAnchor();
		}, 1000);
	}
});