define(["underscore","backbone"],function(e,t){e.templateSettings={interpolate:/\{\{\=(.+?)\}\}/g,evaluate:/\{\{(.+?)\}\}/g};var i=t.Model.extend({}),n=t.Collection.extend({url:"/urls/menu",model:i,initialize:function(e,t){this.url=t.urls.menu}});return n});