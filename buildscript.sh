rm ./build/out.js
touch ./build/out.js
for i in `find ./public/game/ -name '*.js'`; do cat $i >> ./build/out.js; printf "\n" >> ./build/out.js; done
cat ./public/nodeexportscript.js >> ./build/out.js