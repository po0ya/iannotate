function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

function checkNumeric(domobj){
	if($.isNumeric(domobj.val()))
            domobj.css("background-color","#fff");
        else 
            domobj.css("background-color","#FA5858");
}
var filepaths;
var values;
var classes;
var rows = -1;
var cols = -1;
var width = -1;
var height = -1;
$(document).ready( function() {
	$(document).on('change', '.btn-file :file', function(evt) {
	    var file = evt.target.files[0];
		alert(file.name);
        if (window.File && window.FileReader && window.FileList && window.Blob) {
		var reader = new FileReader();
		reader.onload = function(progressEvent){
		    // Entire file
		    //
		  	console.log(this.result);

		    // By lines
		    
		    var lines = this.result.split('\n');
            filepaths = Array(lines.length-1);
            values = Array(lines.length-1);
		    classes = lines[0].split(',');
		    for(var line = 1; line < lines.length; line++){
		      lineitems = lines[line].split(',');
		      if($.trim(lineitems)==='')
			continue;
		      filepaths[line-1] = lineitems[0];
			if (lineitems.length>1){
			      values[line-1] = lineitems[1];
			} else {
				values[line-1] = 0;
			}
		    }
			$('#showResults').show();
			showResults();
		  
		}
		reader.readAsText(file);
		} else {
		  alert('The File APIs are not fully supported by your browser.');
		}

	});
    $('#rows').change(function () {
        if($.isNumeric($(this).val())) 
            rows = Math.floor($(this).val());
	checkNumeric($(this));
    });


    $('#cols').change(function () {
        if($.isNumeric($(this).val())) 
            cols = Math.floor($(this).val());
    	checkNumeric($(this));
	
	});
    $('#width').change(function () {
        if($.isNumeric($(this).val())) 
            width = Math.floor($(this).val());
    	checkNumeric($(this));
	});
    $('#height').change(function () {
        if($.isNumeric($(this).val())) 
            height = Math.floor($(this).val());
    	checkNumeric($(this));
    });

    $('#showResults').click(showResults);
   
});
function showResults(){
	if(cols===-1 || width===-1 || rows===-1 || height===-1 ){
		checkNumeric($('#cols'));
		checkNumeric($('#rows'));
		checkNumeric($('#height'));
		checkNumeric($('#width'));
	} else{	
	alert(cols+" "+width+" "+height+" "+height+" ");
		
       for(var i=0;i<filepaths.length;i++){
	       $('#main').html('');
	       $('#main').append('<div class="row">'+filepaths[i]+' '+values[i]+'</div>');
       }
    }
}


