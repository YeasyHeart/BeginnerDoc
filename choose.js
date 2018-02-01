(function(){
	ChooseLayer = cc.Layer.extend({
		jsBind:{
			back:
			{
				_layout:[[1,1],[0.5,0.5],[0,0],2],
				close:{
					_click:function(btn,evt)
					{
						jsclient.chooseui.removeFromParent(true);
					}
				},
				selectBg:{
					_run:function(){ selectBg=this; },
					ddzSelect:{
						_click:function(btn,evt)
						{
							jsclient.chooseui.removeFromParent(true);
							sendEvent("joinRoom");
							cc.log("ddz=============");
							jsclient.gameid = "ddz";
						}
					},
					scmjSelect:{
						_click:function(btn,evt)
						{
							jsclient.chooseui.removeFromParent(true);
							sendEvent("joinRoom");
							cc.log("scmj=============");
							jsclient.gameid = "hanmj";
						}
					}
				}
			}
		},
		ctor:function () {
			this._super();
			var chooseui = ccs.load("res/choose.json");
			ConnectUI2Logic(chooseui.node,this.jsBind);
			this.addChild(chooseui.node);
			jsclient.chooseui=this;
			return true;
		}
	});
})();