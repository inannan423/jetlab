export default `
<!DOCTYPE html>
<html lang="en">
  <body>
      <div id="main">
          <div id="" class="id-w">
              <div id="">昵称</div>
              <div id="">时间</div>
          </div>
      </div>
      <script type="text/javascript">
          var list = [{
                  name: "小张",
                  time: "12:22"
              },
              {
                  name: "小刘",
                  time: "12:22"
              },
              {
                  name: "小李",
                  time: "12:22"
              },
              {
                  name: "小孙",
                  time: "12:22"
              },
              {
                  name: "小周",
                  time: "12:22"
              },
          ]
          var cent = document.getElementById("main");

                  console.log(cent);
                  var str = ''
                  for(var i = 0; i < list.length; i++) {
                      str += "<div id='' class='id-w'>" +
                          "<div id=''> " + list[i].name + "</div>" +
                          "<div id=''>" + list[i].time + "</div></div>";
                  }
                  cent.innerHTML = str
              </script>
          </body>
        </html>
`
