// Filename: ${baseUrl}/js/views/list.js
define([
    'underscore',
    'Backbone.Form',
    'libs/bobamo/list',

    'modelcollections/${model.modelName}',
    'text!templates/${model.modelName}/table.html',
    'text!templates/${model.modelName}/table-item.html'
], function (_,Form,View, m, tableTemplate, tableItemTemplate) {
    "use strict";

     var qform = {{html JSON.stringify(model.finder(view).display) || 'null' }};
    return View.extend({
        initialize:function(options, params){
            var FM =     m.Collection.extend({
                url:'${api}/${model.modelName}/finder/${view}'
            });
            this.collection = new FM()
            View.prototype.initialize.apply(this, arguments);

        },
        events:{
          submit:'onFormSubmit'
        },
        onFormSubmit:function(e){
            e.preventDefault();
            console.log('onFormSubmit',this.form.getValue());
            this.collection.fetch({data:this.form.getValue()});
        },
        template:_.template(tableTemplate),
        render:function(){
            View.prototype.render.apply(this, arguments);
            if (qform){
                var form = this.form = new Form(qform).render();
                form.$el.append('<div class="form-actions"><button class="btn">Cancel</button><button type="submit" class="btn pull-right btn-primary save finish">Submit</button></div>')
                this.$el.find('.table').before(form.el);
            }

            this.$table.find('.title').append(" &gt; <span>${model.finder(view).title}</span>")

            return this;
        },
        listItemTemplate:_.template(tableItemTemplate),
        config:{
            title:'${model.title}',
            modelName:'${model.modelName}',
            plural:'${model.plural}'
        }
    });
});