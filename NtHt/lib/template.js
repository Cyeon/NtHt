var template={
  html:
  function (title, list, description,queryData){
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <script>
      function del_alert(){
        alert("삭제합니다!")
      }
      </script>
    </head>
    <body>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/bL-ueHzY2yM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <h1><a href="/">${title}</a></h1>
    ${list}
    <a href='/create'> 글 쓰기 </a>
    <a href='/update?id=${title}'> 글 수정 </a>
    <form action="/delete_page" method = "post" onsubmit="return del_alert()">
    <input type = "hidden" name="id" value="${title}">
    <input type = "submit" value="delete">
    </form>
    <p>${description}</p>

    <div id="disqus_thsread"></div>

    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6268e2a7b0d10b6f3e6f8d76/1g1kranmo';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    </script>
    <!--End of Tawk.to Script-->

    <script>
        /**
        *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
        *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
        /*
        var disqus_config = function () {
        this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
        */
        (function() { // D  ON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://zunu.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

    </html>
    `
  }
  ,
  List:
  function (filelist) {
    var list= '<ol>';
    for(var i=0;i<filelist.length;i++){
      list=list+`<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    }
    list= list+'</ol>';
    return list;
  }
}
module.exports=template;
