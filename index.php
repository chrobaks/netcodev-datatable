<!DOCTYPE html>
<html lang="de">
    <head>
        <title>DataTable ver. 1.0.0</title>
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
            <h4>DataTable ver. 1.0.0</h4>
            <div id="dataTableDemo" class="dataTable">

                <div class="dataTable-toolbar">
                    <button class="btn-show-list btn-blue">Liste zeigen</button>
                    <button class="btn-show-selection btn-blue">Auswahl zeigen</button>
                    <button class="btn-reset-selection btn-blue">Auswahl aufheben</button>
                    <div class="dataTable-col-toggle-wrapper">
                        <button class="btn-col-toggle btn-blue">In Spalte <span class="column-name"></span> suchen</button>
                        <div class="dataTable-col-toggle-list toggle-top dataTable-toggle-list-search"></div>
                    </div>
                    <div class="dataTable-search-wrapper-str">
                        <input class="inpt-search" type="text" data-col-index="">
                        <div class="btn-search btn-blue"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg></div>
                    </div>
                    <div class="dataTable-search-wrapper-date">
                        <input class="inpt-date date-start" type="text" data-col-index="">
                        <span>-</span> 
                        <input class="inpt-date date-end" type="text">
                        <div class="date-menu" data-date-id="">
                            <select class="slct-date date-day"><option value="">Tag</option></select>
                            <select class="slct-date date-month"><option value="">Monat</option></select>
                            <select class="slct-date date-year"><option value="">Jahr</option></select>
                        </div>
                        <div class="btn-search btn-blue"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg></div>
                    </div>
                </div>

                <div class="dataTable-wrapper">
                    <table class="dataTable-table">
                        <thead class="dataTable-header"></thead>
                        <tbody class="dataTable-content"></tbody>
                    </table>
                </div>
                
                <div class="dataTable-toolbar">
                    <button class="btn-step-back btn-green">
                        <div class="svg-wrapper"><svg version="1.1" viewBox="0 0 640 640" width="20" height="20"><defs><path d="M320.02 480.01L640.02 640L640.01 319.99L640 0L320.01 159.99L0.01 320.01L320.02 480.01Z" id="dByRCX4Jj"></path></defs><g><g><g><use xlink:href="#dByRCX4Jj" opacity="1" fill="#96938e" fill-opacity="1"></use><g><use xlink:href="#dByRCX4Jj" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></div>
                    </button>
                    <div class="dataTable-content-info"></div>
                    <button class="btn-step-forward btn-green">
                        <div class="svg-wrapper"><svg version="1.1" viewBox="0 0 640 640" width="20" height="20"><defs><path d="M320.01 160L0 0.02L0.01 320.02L0.02 640.02L320.02 480.02L640.01 320.01L320.01 160Z" id="bIbcTwxec"></path></defs><g><g><g><use xlink:href="#bIbcTwxec" opacity="1" fill="#96938e" fill-opacity="1"></use><g><use xlink:href="#bIbcTwxec" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></div>
                    </button>
                    <input type="text" class="inpt-content-length">
                    <button class="btn-content-length btn-green">Ergebnisse pro Seite</button>
                    <input type="text" class="inpt-step" value="1">
                    <button class="btn-step btn-green"> / <span class="dataTable-max-step">1</span> Seite</button>
                    <div class="dataTable-col-toggle-wrapper">
                        <button class="btn-col-toggle btn-green">Spalten zeigen/verstecken</button>
                        <div class="dataTable-col-toggle-list toggle-bottom dataTable-toggle-list-column"></div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>