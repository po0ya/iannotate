function saveTextAsFile()
{
	var textToWrite = classes[0]+','+classes[1]+'\n';
    for(var i=0;i<numImgs;i++){
        textToWrite += filepaths[i]+','+classes[values[i]]+'\n';
    }
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = 'out.csv';

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
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
var changedValues;
var classes;
var rows = -1;
var cols = -1;
var width = -1;
var height = -1;
var numImgs = 0;
var page = 1;
var maxPages=1;
$(document).ready( function() {
	$(document).on('change', '.btn-file :file', function(evt) {
	    var file = evt.target.files[0];
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
            changedValues = Array(lines.length-1)
		    classes = lines[0].split(',');
		    for(var line = 1; line < lines.length; line++) {
                lineitems = lines[line].split(',');
                if ($.trim(lineitems) === '')
                    continue;
                numImgs++;
                filepaths[line - 1] = lineitems[0];
                values[line - 1] = '0';
                if (lineitems.length > 1) {
                    if (lineitems[1] === classes[1])
                        values[line - 1] = '1';
                }
            }
			$('#showResults').show();
            $('#save').show();
            $('#width').val(100);
            width=100;
            $('#height').val(150);
            height=150;
            $('#rows').val(10);
            rows=10;
            $('#cols').val(10);
            cols=10;
            showResults();

		};
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

    $('#page').change(function () {
        if($.isNumeric($(this).val())) {
            p = Math.floor($(this).val());
            if(p>maxPages) {
                page = maxPages;
                this.val(maxPages);
            }
            else if(p<1)
            {
                page = 1;
                this.val(1);
            } else {
                page = p;
            }
        }
    	checkNumeric($(this));
	});


    $('#showResults').hide();
    $('#save').hide();

    $('#showResults').click(showResults);
    $('#save').click(saveTextAsFile);
    $('#nextpage').click(function(){
        page = page+1;
        $('#page').val(page);
        showResults();
    });

    $('#prevpage').click(function(){
        page = page-1;
        $('#page').val(page);
        showResults();
    });



   
});

function setTD(){
    $('.myimg').click(function(){
        par = $(this).parent();
        h=par.find(':hidden')[0];
        par.toggleClass('val'+values[h.value]);
        values[h.value] = values[h.value]===0?1:0;
        par.toggleClass('val'+values[h.value]);
    });
}

function showResults(){
	if(cols===-1 || width===-1 || rows===-1 || height===-1 ){
		checkNumeric($('#cols'));
		checkNumeric($('#rows'));
		checkNumeric($('#height'));
		checkNumeric($('#width'));
	} else{
        $('#main').html('');
		$('#main').append('<table class="table imgstable">');
        maxPages = Math.ceil((numImgs*1.0)/(rows*cols));
        $('#totalpages').text('/'+maxPages);
        $('#page').val(page);
        var ind;
       for(var i=0;i<rows;i++){
           $('#main').append('<tr>');

           for(var j=0;j<cols;j++) {
               ind = (page-1)*rows*cols+i*cols+j;
               if(ind>numImgs-1)
                   break;
               $('#main').append('<td class="imgcell val'+values[ind]+'">' +
               '<img src="'+filepaths[ind]+'" alt="'+filepaths[ind]+'" class="img-rounded myimg">' +
                   '<input type="hidden" value="'+ind+'"/>'+
               '</td>');
           }

           $('#main').append('</tr>')
           if(ind>numImgs)
                   break;
       }

		$('#main').append('</table>');

        $('img.myimg').css('max-width',width);
        $('img.myimg').css('max-height',height);
        setTD();
    }
}


