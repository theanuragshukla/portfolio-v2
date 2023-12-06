lang=$1
res=$(curl -s "https://github.com/search/count?q=org:theanuragshukla%20%20language:$lang%20%20is:issue&type=repo")
res=$(echo "$res" | sed 's/<[^>]*>//g')
echo "$res"
