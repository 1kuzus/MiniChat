%提交并push到main分支%

@echo off

if "%~1"=="" (
    echo no message!
    exit
)

git add .
git commit -m "%1"
git push

echo done.