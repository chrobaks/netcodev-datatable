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
        <script>
            window.onload = function () {
                const dataTableDemo = new DataTable("dataTableDemo", {ajaxUrl   : "datatable.php", domAttr : {colWidth : 250, mnWidth : 70}});
            }

        </script>
    </head>
    <body>
        <div class="container">
            <h4>NetCoDev DataTable ver. 1.0.0</h4>
            <div id="dataTableDemo" class="dataTable"></div>
        </div>
    </body>
</html>