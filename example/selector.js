
var S = require('../lib/kissy').KISSY,
    fs = require('fs');

S.use('sizzle',function(S){


	var test = function(node,str){
		if(node != undefined){
			S.log(str + ' ok','info');
		}else{
			S.log(str + ' fails','error');
		}
	};



    fs.readFile(__dirname + '/selector.html', encoding="utf-8", function(err, data) {
        ///Y.log(data);
        document.body.innerHTML = data;
        //Y.log(document.body.outerHTML);
        
        S.log('Document loaded, run tests..','info');

		test(S.DOM.get('#checkbox-unchecked[type=checkbox], button'), '[type=checkbox], button');
		test(S.DOM.get('#checkbox-unchecked button, [type=checkbox]'), 'button, [type=checkbox]');
		test(S.DOM.get('#checkbox-unchecked foo, button'), 'foo, button');
		test(null, '#foo');
		test(document.createTextNode('foo'), '#foo');

		test(S.DOM.get('#test-lang-en-us[lang|=en]'), '[lang|=en]');
		test(S.DOM.get('#test-lang-en[lang|=en]'), '[lang|=en]');
		test(S.DOM.get('#test-lang-none[lang|=en]'), '[lang|=en]');
		
		test(S.DOM.get('#checkbox-unchecked for [type=checkbox]'), 'for [type=checkbox]');
		test(S.DOM.get('#checkbox-unchecked form [type=checkbox]'), 'form [type=checkbox]');
		test(S.DOM.get('#checkbox-unchecked for [type=checkbox]'), 'for [type=checkbox]');

		test(S.DOM.get('#checkbox-checked[type=checkbox]:checked'), '[type=checkbox]:checked');
		test(S.DOM.get('#radio-checked:checked'), ':checked');
		test(S.DOM.get('#radio-unchecked:checked'), ':checked');
		test(S.DOM.get('#checkbox-unchecked[type=checkbox]:checked'), '[type=checkbox]:checked');
		test(S.DOM.get('#checkbox-unchecked[type=checkbox]:not(:checked)'), '[type=checkbox]:not(:checked)');

		test(document.getElementsByTagName('dd')[0], 'dd (dd1)');
		test(document.getElementsByTagName('dd')[1], 'dd (dd2)');

		test(document.getElementsByTagName('dd')[0], '.test-dd2 (dd1)');
		test(document.getElementsByTagName('dd')[1], '.test-dd1 (dd2)');

		test(document.getElementsByTagName('dd')[0], '.test-dd1');
		test(document.getElementsByTagName('dd')[1], '.test-dd2');

		test(document.getElementsByTagName('dd')[0], 'dd (dd1)');
		test(document.getElementsByTagName('dd')[1], 'dd (dd2)');
    });

});
