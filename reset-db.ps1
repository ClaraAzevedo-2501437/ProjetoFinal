# Reset Database Script with UTF-8 encoding
$env:PGPASSWORD = "PGSQL2026"
$psql = "C:\Program Files\PostgreSQL\16\bin\psql.exe"
$projectPath = "C:\Users\clara\Documents\MEIW\Programação Web Avançada\ProjetoFinal"

Write-Host "Stopping backend server..." -ForegroundColor Yellow
$port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
if ($port) {
    Stop-Process -Id $port -Force
    Write-Host "Backend stopped" -ForegroundColor Green
    Start-Sleep -Seconds 2
}

Write-Host "Dropping and recreating database..." -ForegroundColor Yellow
& $psql -U postgres -c "DROP DATABASE IF EXISTS project_proposals;"
& $psql -U postgres -c "CREATE DATABASE project_proposals WITH ENCODING 'UTF8' LC_COLLATE='Portuguese_Portugal.1252' LC_CTYPE='Portuguese_Portugal.1252' TEMPLATE=template0;"

Write-Host "Creating schema..." -ForegroundColor Yellow
& $psql -U postgres -d project_proposals -f "$projectPath\backend\sql\01_create_tables.sql"

Write-Host "Loading seed data..." -ForegroundColor Yellow
& $psql -U postgres -d project_proposals -f "$projectPath\backend\sql\02_seed_data.sql"

Write-Host "Database reset complete!" -ForegroundColor Green
Write-Host "Starting backend server..." -ForegroundColor Yellow

cd "$projectPath\backend"
npm start
