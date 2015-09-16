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
		    console.log(this.result);

		    // By lines
		    var lines = this.result.split('\n');
            filepaths = Array(lines.length-1);
            values = Array(lines.length-1);
		    classes = lines[0].split(',');
		    for(var line = 1; line < lines.length; line++){
		      lineitems = lines[line].split(',');
		      filepaths[line] = lineitems[0];
			if (lineitems.length>1){
			      values[line] = lineitems[1];
			} else {
				values[line] = 0;
			}
		    }
			$('#showResults').show();
		  };
		

		} else {
		  alert('The File APIs are not fully supported by your browser.');
		}

	});
    $('#row').change(function () {
        if($.isNumeric(this.val())) {
            rows = Math.floor(this.val());
            this.css({"background-color":"#000"});
        }
        else {
            this.css({"background-color":"#f00"});
        }
    });


    $('#col').change(function () {
        if($.isNumeric(this.val())) {
            cols = Math.floor(this.val());
            this.css({"background-color":"#000"});
        }
        else {
            this.css({"background-color":"#f00"});
        }
    });

    $('#showResults').click(function () {

       for(var i=0;i<filepaths.length;i++){
           for()
       }
    });

});


