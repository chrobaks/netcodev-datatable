<?php
class DataTableMock
{
    public static function getData ($config, $maxCol, $setHeader)
    {    
        
        $result = ["content" => []];

        for ($n = $config->start; $n <= $config->end; $n++) {
            $row = [];
            $setCol = false;

            if ($n === $config->start && $setHeader) {
                $result["header"] = [];
                $setCol = true;
            }

            for ($i = 1 ; $i <= $maxCol; $i++) { 
                if ($setCol) {
                    $result["header"][] = "col $i";
                }
                $row[] = "row $n / val $i"; 
            }
            $result["content"][] = $row;
        }

        return $result;
    }

    public static function getCsv ($config, $setHeader)
    {
        $resCsv = ["header" => [],"content" => []];
        if (($handle = fopen("testdaten.csv", "r")) !== FALSE) {
            $row = 0;
            $rowC = $config->start;
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                array_splice($data,39);
                $num = count($data);
                if ($row === 0) {
                    if ($setHeader) {
                        $resCsv["header"] = [];
                        $rowData = [];
                        for ($c=0; $c < $num; $c++) {
                            $rowData[] = $data[$c];
                        }
                        $resCsv["header"] = $rowData;
                    }
                } else {
                    if ($row >= $config->start && $rowC <= $config->end) {
                        $rowData = [];
                        for ($c=0; $c < $num; $c++) {
                            $rowData[] = $data[$c];
                        }
                        $resCsv["content"][] = $rowData;
                        $rowC++;
                    }
                }
                $row++;
            }
            fclose($handle);
        } 
        return $resCsv;
    }

    public static function getCsvLen ()
    {
        $resCsv = ["header" => [],"content" => []];
        if (($handle = fopen("testdaten.csv", "r")) !== FALSE) {
            $row = 0;
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $row++;
            }
            fclose($handle);
        } 
        return  $row - 1;
    }
}

class DataTable 
{
    private $config;

    public function __construct()
    {
        $this->config = (object)[
            "start"     => 1,
            "end"       => 100,
            "next"      => 0,
            "step"      => 1,
            "stepLen"   => 100,
            "maxStep"   => 0,
            "maxLen"    => DataTableMock::getCsvLen(),
            "actualLen" => 0,
            "rowLen"    => 100
        ];
    }

    public function response ()
    {
        $this->config->stepLen = (isset($_REQUEST['contlen'])) ? $_REQUEST['contlen'] : $this->config->stepLen;
        $this->config->actualLen = $this->config->stepLen;
        $this->config->maxStep = ceil($this->config->maxLen / $this->config->stepLen);
        $this->config->end = $this->config->stepLen * $this->config->step;
        $setHeader = (isset($_REQUEST['step']) || isset($_REQUEST['contlen'])) ? false : true;
        $doResponse = true;
        $dataTable = [];

        if (isset($_REQUEST['step'])) {
            $this->config->step = $_REQUEST['step'];
            $this->config->next = $this->config->stepLen * $this->config->step;
            $this->config->start = ($this->config->step < 2) ? 1 : $this->config->next - $this->config->stepLen;
            $this->config->end = ($this->config->maxLen < $this->config->next)  ? $this->config->maxLen : $this->config->next;
            $this->config->actualLen = $this->config->end;
            $this->config->rowLen = $this->config->end - $this->config->start;
            if($this->config->maxLen < $this->config->start || (int)$this->config->step < 1) {
                $doResponse = false;
            }
        } else if (isset($_REQUEST['contlen'])) {
            $this->config->stepLen = $_REQUEST['contlen'];
            $this->config->next = $this->config->stepLen * $this->config->step;
            $this->config->end = ($this->config->maxLen < $this->config->next)  ? $this->config->maxLen : $this->config->next;
            $this->config->actualLen = ($this->config->maxLen < $this->config->next + $this->config->stepLen)  ? $this->config->maxLen : $this->config->next;
            $this->config->rowLen = $this->config->end - $this->config->start;
        }

        if ($doResponse){
            foreach ($this->config as $key => $val) {
                $dataTable[$key] = $val;
            }
            $dataTable = array_merge($dataTable, DataTableMock::getData($this->config, 19, $setHeader));
            // $dataTable = array_merge($dataTable, DataTableMock::getCsv($this->config, $setHeader));
            $response = ["status" => "ok", "dataTable" => $dataTable];
            echo json_encode($response);
        }

        exit(0);
    }
}

$DataTable = new DataTable();
$DataTable->response();
