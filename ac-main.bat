%提交到main分支%

@echo off

if "%~1"=="" (
    echo no message!
    exit
)

git add .
git commit -m "%1"

echo done.