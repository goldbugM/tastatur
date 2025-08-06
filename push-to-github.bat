@echo off
echo Pushing to GitHub repository...

REM Initialize git if not already done
if not exist .git (
    echo Initializing git repository...
    git init
    git branch -M main
)

REM Add remote origin if not already added
git remote remove origin 2>nul
git remote add origin https://github.com/goldbugM/tastatur.git

REM Add all files
echo Adding files...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Deploy typing trainer application to GitHub Pages"

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo ========================================
echo Push completed!
echo.
echo Next steps:
echo 1. Go to https://github.com/goldbugM/tastatur
echo 2. Go to Settings ^> Pages
echo 3. Set Source to "GitHub Actions"
echo 4. Your site will be available at:
echo    https://goldbugm.github.io/tastatur
echo ========================================
pause