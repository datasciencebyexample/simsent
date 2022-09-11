$(document).ready(function () {
    // 页面刚开始隐藏搜索结果的部分
    //$("#resultSection").hide();

    // id为searchPaper的按钮按下触发searchPaper()方法
    $("#searchPaper").click(function () {
        keyword = $("#keyword").val();
		recommend(keyword);

	

	
    });


});


// 在按下enter键的时候就搜索
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
	
		recommend($("#keyword").val());
	
    }
});


function recommend(key) {
    // 首先清空result中的内容以便内容填入
    $("#result").empty();
  
  // call api
  // POST request using fetch()
	fetch("https://gwzx1owxh7.execute-api.us-east-1.amazonaws.com/prod", {
		
		//mode: "cors",
		// Adding method type
		method: "POST",
		
		// Adding body or contents to send
		body: JSON.stringify({
			"sent":key
			
		}),
		 
		// Adding headers to the request
		//headers: {
		//	"Content-type": "application/json; charset=UTF-8"
		//}
	})
	 
	// Converting to JSON
	.then(response => response.json())
	 
	.then(function(result)
	  {
	   //console.log(result)
	   //var result = $.parseJSON(result)
	   console.log(result)
	  
		let res = result['body'];
		//console.log(res)
		
		// 利用for插入每一个结果
		if (res.length) {
			for (i = 0; i < res.length; i++) {
				// 将返回的结果包装成HTML
				resultItem =
					`
					<div class='col-md-12 mb-4'>
						<div class='card mb-12 shadow-sm'>
							<div class='card-body'>
								<h5>` +
					res[i]+
				   `</small></h5>
								<p class='text-muted' style='margin-bottom: 0.5em'>`  +
					'' +
					`</p>
							</div>
						</div>
					</div>
				`;
				// 插入HTML到result中
				$("#result").append(resultItem);
			}

			// 搜索完以后让搜索框移上去，带有动画效果
			$("section.jumbotron").animate({
				margin: "0"
			});
			// 显示搜索结果的部分
			$("#resultSection").show();
			// 清空输入联想
			$("#suggestList").empty();
		}
	  
	}).catch(error => console.error('Error:', error)); 
  
	//console.log(results);
  
  
}


