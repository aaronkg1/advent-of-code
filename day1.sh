#!../../../bin/bash

re='^[0-9]+$'
total=0
highest=0
top3=(0 0 0)
end='end'
final=()
cat $1 | while read num;
do
    if [[ -z $num ]]
    then
       for (( i = 0; i < 3; i++)); 
       do
        if [[ $total -gt ${top3[$i]} ]]
        then
            top3[$i]=$(($total))
            break
        fi
       done
       total=0
    elif [[ $num =~ $re ]]
    then
        total=$(($num + $total))
    elif [[ "$num" == "end" ]]
    then
        sum=0
        for (( i = 0; i < 3; i++));
        do
        sum=$(($sum + ${top3[$i]}))
        done
        echo The answer is $sum
    fi
done 

# Answer is 196804 using day1input.txt as an input