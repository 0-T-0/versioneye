define(["underscore","backbone","moment","/assets/scm_app/views/switch_view"],function(e,t,i,n){e.templateSettings={interpolate:/\{\{\=(.+?)\}\}/g,evaluate:/\{\{(.+?)\}\}/g};var a=t.View.extend({tagName:"tr",className:"repo-control-item",template:e.template($("#github-repo-control-item-template").html()),initialize:function(t){this.branch=t.branch,(e.isNaN(this.branch)||e.isNull(this.branch))&&console.error("Branch info is missing - importing will not work;"),this.project_files=t.project_files||[]},render:function(){this.$el.html(this.template({branch:this.branch}));var t=this.$el.find(".item-body"),i=this;return e.isEmpty(this.project_files)?(t.append("Sorry. We couldn't find any project file in this branch."),this):(e.each(this.project_files,function(e){var a=new n({model:i.model,parent:i,branch:i.branch,project_file:e},this);t.append(a.render().$el)}),this)}});return a});