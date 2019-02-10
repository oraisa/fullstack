curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer $2" \
-d "{\"title\": \"$1\", \"author\": \"curl\", \"url\": \"example.com/$1\"}" \
"http://localhost:3001/api/blogs"
