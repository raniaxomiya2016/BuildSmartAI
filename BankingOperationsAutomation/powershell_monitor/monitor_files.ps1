
$folder = Join-Path $PSScriptRoot "incoming"
$logFile = Join-Path $PSScriptRoot "logs/file_log.csv"

$files = Get-ChildItem -Path $folder -Filter "*.csv" -File

$loggedFiles = @()

if (Test-Path $logFile) {
    $loggedFiles = @(Import-Csv $logFile | ForEach-Object { $_.FileName })
}

foreach ($file in $files) {
    if ($file.Name -notin $loggedFiles) {
        $record = [PSCustomObject]@{
            FileName   = $file.Name
            DetectedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            FileSize   = $file.Length
        }

        $record | Export-Csv -Path $logFile -Append
        Write-Host "New file logged: $($file.Name)"
    }
    else {
        Write-Host "Already logged: $($file.Name)"
    }
}


