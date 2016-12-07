(function() {
	function Money(opt) {
		this.data = opt.data;
		this.id = opt.id;
		this.datas = String(this.data);
		this.arr = this.datas.split("");
		this.contain=$("<div class='contain_money'></div>")
		this.ul = $("<ul class='uls'></ul>");
		this.id.prepend(this.contain);
		this.contain.append(this.ul);
		for(var i = 0; i < this.datas.length; i++) {
			if(this.datas[i] != ".") {
				this.ul.append("<li><img class='number_img' src='img/" + this.datas[i] + ".png'/></li>");
			} else {
				this.ul.append("<li><img class='number_img dot' src='img/dot.png'/></li>");
			}
		}
		this.ul.append("<li><img class='number_img' src='img/money.png'/></li>");
		if(this.ul.find("li").length != 9) {
			var newLength = 9 - this.ul.find("li").length;
			for(var i = 0; i < newLength; i++) {
				this.ul.append("<li></li>");
			}
		}
	}
	window.Money = Money;
}())
