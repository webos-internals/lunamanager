function MainAssistant() {}

MainAssistant.prototype.setup = function()
{
	try
	{
		$$('body')[0].addClassName('palm-dark');
		$$('body')[0].removeClassName('palm-default');
		
		this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, { visible: false });
		
		this.controller.setupWidget
		(
			'Rescan',
			this.attributes = 
			{
				type: Mojo.Widget.activityButton
			},
			this.model =
			{
				buttonLabel: 'Rescan',
				buttonClass: 'palm-button',
				disabled: false
			}
		);
		this.controller.setupWidget
		(
			'RestartLuna',
			this.attributes = 
			{
				type: Mojo.Widget.activityButton
			},
			this.model =
			{
				buttonLabel: 'Restart Luna',
				buttonClass: 'palm-button',
				disabled: false
			}
		);
		this.controller.setupWidget
		(
			'RestartJava',
			this.attributes = 
			{
				type: Mojo.Widget.activityButton
			},
			this.model =
			{
				buttonLabel: 'Restart Java',
				buttonClass: 'palm-button',
				disabled: false
			}
		);
		
		this.controller.listen('Rescan',		Mojo.Event.tap, this.doRescan.bindAsEventListener(this));
		this.controller.listen('RestartLuna',	Mojo.Event.tap, this.doRestartLuna.bindAsEventListener(this));
		this.controller.listen('RestartJava',	Mojo.Event.tap, this.doRestartJava.bindAsEventListener(this));
		
	}
	catch (e)
	{
		Mojo.Log.logException(e, 'main#setup');
		this.alertMessage('main#setup Error', e);
	}
}

MainAssistant.prototype.callbackFunction = function(data, item)
{
	for (d in data) alert(d + ': ' + data[d]);
	
	this.controller.get(item).mojo.deactivate();
}

MainAssistant.prototype.doRescan = function()
{
	try
	{
		var r = new Mojo.Service.Request
		(
			'palm://org.webosinternals.ipkgservice',
			{
				method: 'rescan',
				onSuccess: this.callbackFunction.bindAsEventListener(this, 'Rescan'),
				onFailure: this.callbackFunction.bindAsEventListener(this, 'Rescan')
			}
		);
	}
	catch (e)
	{
		Mojo.Log.logException(e, 'main#doRescan');
		this.alertMessage('main#doRescan Error', e);
	}
}

MainAssistant.prototype.doRestartLuna = function()
{
	try
	{
		var r = new Mojo.Service.Request
		(
			'luna://org.webosinternals.ipkgservice',
			{
				method: 'restartluna',
				onSuccess: this.callbackFunction.bindAsEventListener(this, 'RestartLuna'),
				onFailure: this.callbackFunction.bindAsEventListener(this, 'RestartLuna')
			}
		);
	}
	catch (e)
	{
		Mojo.Log.logException(e, 'main#doRestartLuna');
		this.alertMessage('main#doRestartLuna Error', e);
	}
}

MainAssistant.prototype.doRestartJava = function()
{
	try
	{
		var r = new Mojo.Service.Request
		(
			'palm://org.webosinternals.ipkgservice',
			{
				method: 'restartjava',
				onSuccess: this.callbackFunction.bindAsEventListener(this, 'RestartJava'),
				onFailure: this.callbackFunction.bindAsEventListener(this, 'RestartJava')
			}
		);
	}
	catch (e)
	{
		Mojo.Log.logException(e, 'main#doRestartJava');
		this.alertMessage('main#doRestartJava Error', e);
	}
}


MainAssistant.prototype.alertMessage = function(title, message)
{
	this.controller.showAlertDialog(
	{
	    onChoose: function(value) {},
		allowHTMLMessage: true,
	    title: title,
	    message: message,
	    choices:[{label:$L('Ok'), value:""}]
    });
}

MainAssistant.prototype.activate = function(event) {}

MainAssistant.prototype.deactivate = function(event) {}

MainAssistant.prototype.cleanup = function(event)
{
	this.controller.stopListening('Rescan',			Mojo.Event.tap, this.doRescan.bindAsEventListener(this));
	this.controller.stopListening('RestartLuna',	Mojo.Event.tap, this.doRestartLuna.bindAsEventListener(this));
	this.controller.stopListening('RestartJava',	Mojo.Event.tap, this.doRestartJava.bindAsEventListener(this));
}