Ext.define('app.ux.ImageView', {
    extend: 'Ext.form.field.Base',
    alias: 'widget.imageview',
    autoEl: {
        tag: 'img',
        src: "/img/pay.png",
        cls: 'my-managed-image',
        
    },

    
  
    setSrc: function(src) {
        this.autoEl.src = src;
    },
    setValue:function(value)
    {
    	 
    	if(value.indexOf('/')!=0) 
    		{
    		value ='/'+value;
    		}
    		 
    	this.autoEl.src=value;
    	 if( Ext.getDom(this.id))
    	  Ext.getDom(this.id).src= value;
        
        return this;
    },
    
    getSrc: function(src) {
    	 
        return this.autoEl.src;
        
    },
    getValue: function() {
    	 
        return this.autoEl.src;
    }
});