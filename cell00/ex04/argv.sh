count=0
for i in "$@"; do
    count=$((count + 1))
    echo $i
    
    if [ $count -eq 3 ]; then
        break
    fi
done
