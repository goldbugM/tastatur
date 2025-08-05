# Fix manifest.json paths by converting backslashes to forward slashes
$manifestPath = "c:\Users\mb\Desktop\mkboard.com-master\root\public\assets\manifest.json"

# Read the manifest file
$content = Get-Content $manifestPath -Raw

# Replace all backslashes with forward slashes
$fixedContent = $content -replace '\\\\assets\\\\', '/assets/'

# Write the fixed content back
Set-Content $manifestPath $fixedContent

Write-Host "Fixed manifest.json paths - converted backslashes to forward slashes"