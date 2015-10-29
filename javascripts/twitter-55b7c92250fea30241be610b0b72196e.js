function prettyDate(h){if(navigator.appName==="Microsoft Internet Explorer"){return"<span>&infin;</span>"}var g={just_now:" now",minute_ago:"1m",minutes_ago:"m",hour_ago:"1h",hours_ago:"h",yesterday:"1d",days_ago:"d",last_week:"1w",weeks_ago:"w"};var e=new Date(),d=e.getTime(),a=d+(1*60000),c=new Date(h),f=((a-c.getTime())/1000),b=Math.floor(f/86400);if(isNaN(b)||b<0){return"<span>&infin;</span>"}return b===0&&(f<60&&g.just_now||f<120&&g.minute_ago||f<3600&&Math.floor(f/60)+g.minutes_ago||f<7200&&g.hour_ago||f<86400&&Math.floor(f/3600)+g.hours_ago)||b===1&&g.yesterday||b<7&&b+g.days_ago||b===7&&g.last_week||b>7&&Math.ceil(b/7)+g.weeks_ago}function linkifyTweet(d,c){d=d.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi,'<a href="$1$2">$2</a>').replace(/(^|\W)@(\w+)/g,'$1<a href="https://twitter.com/$2">@$2</a>').replace(/(^|\W)#(\w+)/g,'$1<a href="https://search.twitter.com/search?q=%23$2">#$2</a>');for(var b in c){if(c[b].expanded_url!=null){var a=new RegExp(c[b].url,"g");d=d.replace(a,c[b].expanded_url);var a=new RegExp(">"+(c[b].url.replace(/https?:\/\//,"")),"g");d=d.replace(a,">"+c[b].display_url)}}return d}function showTwitterFeed(e,d){var c=document.getElementById("tweets"),b="";for(var a in e){b+='<li><p><a href="https://twitter.com/'+d+"/status/"+e[a].id_str+'">'+prettyDate(e[a].created_at)+"</a>"+linkifyTweet(e[a].text.replace(/\n/g,"<br>"),e[a].entities.urls)+"</p></li>"}c.innerHTML=b}function getTwitterFeed(a,c,b){c=parseInt(c,10);$.ajax({url:"https://api.twitter.com/1/statuses/user_timeline/"+a+".json?trim_user=true&count="+(c+20)+"&include_entities=1&exclude_replies="+(b?"0":"1")+"&callback=?",type:"jsonp",error:function(d){$("#tweets li.loading").addClass("error").text("Twitter's busted")},success:function(d){showTwitterFeed(d.slice(0,c),a)}})};