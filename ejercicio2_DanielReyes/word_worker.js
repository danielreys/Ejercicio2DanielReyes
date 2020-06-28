self.addEventListener('message', function(e) {
    var data = e.data[0]; // Words to replace
    var text = e.data[1]; // Text from DOM 

    for (let [key, value] of Object.entries(data.message)) {
        if(value.action === 'mark_text'){ //mark the text
           for (let i = 0; i < value.keywordToSearch.length; i++)
           {           
               var newText = text.replace(new RegExp(value.keywordToSearch[i], "g"), "<span class='highlighted'>"+value.keywordToSearch[i]+"</span>");
               text = newText;  
            }
        }
        else if (value.action === 'wrapper_with_link'){ //add a link
            for (let i = 0; i < value.keywordsToSearch.length; i++)
            {
                var newText = text.replace(new RegExp(value.keywordsToSearch[i], "g"), '<a href="'+ value.href+ '">' +value.keywordsToSearch[i] + '</a>');
                text = newText; 
            }
        }
    }
    self.postMessage(text);
  }, false);
