<!DOCTYPE html>
<html lang="de">
    <head>
        <title>NetCoDev DataTable ver. 1.0.0</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/datatable.css" rel="stylesheet">
        <?php
            $dirFiles = array_diff(scandir("js/source/"), array('..', '.'));
            $js = explode(',',"js/source/".implode(',js/source/', $dirFiles));
            foreach ($js as $file) {
                echo '<script src="'.$file.'"></script>'."\n";
            }
        ?>
        <style>
            a.chng-lang {color:#2E9AFE; cursor: pointer;}
            a.chng-lang.active {color:rgb(4, 180, 4, 0.7)}
        </style>
        <script>
            window.onload = function () {
                // Get instance of DataTable
                const dataTableDemo = new DataTable("dataTableDemo", {ajaxUrl   : "datatable.php", domAttr : {colWidth : 250, mnWidth : 70}});
                // Workaround change DataTable language
                document.querySelectorAll('.chng-lang').forEach((obj) => { obj.onclick = () => {
                    if (! obj.classList.contains('active')) {
                        document.querySelector('.chng-lang.active').classList.remove('active');
                        obj.classList.add('active');
                        dataTableDemo.setAppLang(obj.dataset.lang);
                    }}
                });
            }

        </script>
    </head>
    <body>
        <div class="container">
            <h4>NetCoDev DataTable ver. 1.0.0 <small><a class="chng-lang active" data-lang="de">de</a> / <a class="chng-lang" data-lang="en">en</a></small></h4>
            <div id="dataTableDemo" class="dataTable"></div>
        </div>
    </body>
</html>