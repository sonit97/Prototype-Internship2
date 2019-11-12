$(document).ready(function() {

        $('#datatable').DataTable({
            "responsive" : true,
            "lengthMenu": [[10, 20, 50, 100], [10, 20, 50, 100]],
            "autoWidth": false,
            "iDisplayLength": 10,
            "pagingType": "full_numbers"                      
        });

        $('#search').click(function(){
            $('.tableUpdate').css('display','block');
        });

        $('#resetSearch').click(function(){
            $('.tableUpdate').css('display','none');
        });

        $('#表示').click(function(){
            var records = $('#records').val();
            var table = $('#datatable').DataTable();
            
            table.page.len(records).draw();
            var info = table.page.info();
            document.getElementById('totalPage').innerHTML = info.pages;
            document.getElementById('currentPage').innerHTML = info.page + 1;
            updatePage();
        });

       /* $(".number").on("keypress keyup blur",function (event) {  
            if(event.which != 189)  {
                if ((event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }
            }
        });*/

        var oTable;

        $('#表示').click(function(){
            var records = $('#records').val();
            $('#datatable').DataTable().page.len(records).draw();
        });

        document.getElementById('datatable_info').style.display = 'none';
        document.getElementById('datatable_length').style.display = 'none';
        document.getElementById('datatable_filter').style.display = 'none'; 
        document.getElementById('datatable_paginate').style.display = 'none';   

        var table = $('#datatable').DataTable();
        var info = table.page.info();

        document.getElementById('totalPage').innerHTML = info.pages;
        document.getElementById('currentPage').innerHTML = info.page + 1;
        document.getElementById('goPage').innerHTML = info.page + 1;

        document.getElementById('goPage').addEventListener("keypress", function (e) {
            var allowedChars = '0123456789';
            function contains(stringValue, charValue) {
                return stringValue.indexOf(charValue) > -1;
            }
            var invalidKey = e.key.length === 1 && !contains(allowedChars, e.key)
            || e.key === '.' && contains(e.target.value, '.');
            invalidKey && e.preventDefault();
        });

        var currentPage = parseInt($('#currentPage').text());
        var totalPage = parseInt($('#totalPage').text());
        if(currentPage == 1){
            $('#backlock').css('background','url(images/backlock.png) no-repeat');
        } else {
            $('#backlock').css('background','url(images/prev.png) no-repeat');
        }

    });

    function numbersOnly(Sender,evt,isFloat,isNegative) {
        if(Sender.readOnly) return false;       

        var key   = evt.which || !window.event ? evt.which : event.keyCode;
        var value = Sender.value;

        if((key == 46 || key == 44) && isFloat){                
            var selected = document.selection ? document.selection.createRange().text : "";
            if(selected.length == 0 && value.indexOf(".") == -1 && value.length > 0) Sender.value += ".";
            return false;
        }
        if(key == 45) { // minus sign '-'
            if(!isNegative) 
                return false;
            if(value.indexOf('-')== -1) 
                Sender.value = '-'+value; 
            else 
                Sender.value = value.substring(1);
            if(Sender.onchange != null) {
                if(Sender.fireEvent){
                    Sender.fireEvent('onchange');
                } else {
                    var e = document.createEvent('HTMLEvents');
                        e.initEvent('change', false, false);
                    Sender.dispatchEvent(e);
                }
            }

            var begin = Sender.value.indexOf('-') > -1 ? 1 : 0;
            if(Sender.setSelectionRange){
                Sender.setSelectionRange(begin,Sender.value.length);
            } else {
                var range = Sender.createTextRange();
                range.moveStart('character',begin);
                range.select();                 
            }
            return false;
        }
        if(key > 31 && (key < 48 || key > 57)) 
            return false;
    }

    function updatePage(){
        var currentPage = parseInt($('#currentPage').text());
        var totalPage = parseInt($('#totalPage').text());
        if(currentPage == 1){
            $('#backlock').css('background','url(images/backlock.png) no-repeat');
        }

        if(currentPage < totalPage){
            $('#next').css('background','url(images/next.png) no-repeat');
        }

        if(currentPage == totalPage){
            $('#next').css('background','url(images/nextlock.png) no-repeat');
        }   

        if(currentPage > 1){
            $('#backlock').css('background','url(images/prev.png) no-repeat');
        }
    }

    function updateTotalPage(){
        var table = $('#datatable').DataTable();
        var info = table.page.info();
        document.getElementById('totalPage').innerHTML = info.pages;
    }

    function functionPre(){
        document.getElementById('datatable_previous').click();
        var table = $('#datatable').DataTable();
        var info = table.page.info();
        document.getElementById('currentPage').innerHTML = info.page + 1;
        document.getElementById('goPage').value = info.page + 1;

        var currentPage = parseInt($('#currentPage').text());
        var totalPage = parseInt($('#totalPage').text());
        if(currentPage == 1){
            $('#backlock').css('background','url(images/backlock.png) no-repeat');
        }

        if(currentPage < totalPage){
            $('#next').css('background','url(images/next.png) no-repeat');
        }

    }
    
    function functionNext(){
        document.getElementById('datatable_next').click();
        var table = $('#datatable').DataTable();
        var info = table.page.info();
        document.getElementById('currentPage').innerHTML = info.page + 1;

        document.getElementById('goPage').value = info.page + 1;

        var currentPage = parseInt($('#currentPage').text());
        var totalPage = parseInt($('#totalPage').text());
        if(currentPage == totalPage){
            $('#next').css('background','url(images/nextlock.png) no-repeat');
        }   

        if(currentPage > 1){
            $('#backlock').css('background','url(images/prev.png) no-repeat');
        }
    }

    function functionGoPage(){
        var table = $('#datatable').DataTable();
        var info = table.page.info();
        var current = info.page + 1;
        var p = parseInt(document.getElementById('goPage').value); 
        var total = parseInt(info.pages);
        if(p>total){
            //functionLast();
            document.getElementById('goPage').value = info.pages;
            document.getElementById('currentPage').innerHTML = info.pages;  
            p = total;
        }

        if(p < 1){
            functionFirst();
            document.getElementById('goPage').value = "1";
        }

        p = parseInt(document.getElementById('goPage').value); 

        var go = parseInt(p - current); 

        if(go > 0){
            for (var i = 0; i < go; i++) {
                functionNext();
            }

            document.getElementById('currentPage').innerHTML = info.page + 2;         
        }

        if(go < 0){
            for (var i = 0; i > go; i--) {
                functionPre();
            }
        }

        updateInfo();
    }

    function updateInfo(){
        var table = $('#datatable').DataTable();
        var info = table.page.info();
        document.getElementById('totalPage').innerHTML = info.pages;
        document.getElementById('currentPage').innerHTML = info.page + 1;     
    }

    function functionNumberRecord(){
        var num = parseInt(document.getElementById('cboNumberRecord').value);
        var table = $('#datatable').DataTable();

    }

    function functionFirst(){
        document.getElementById('table_first').click();
        var table = $('#datatable').DataTable();
        var info = table.page.info();
        document.getElementById('currentPage').value = info.page + 1;
    }   

    function functionLast(){
        document.getElementById('table_last').click();
        var table = $('#datatable').DataTable();
        var info = table.page.info();
        document.getElementById('currentPage').value = info.page + 1;
    }

    $(document).ready(function(){
        $('#SEQinput').focus();
    });
