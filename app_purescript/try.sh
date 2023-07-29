#!/nix/store/51sszqz1d9kpx480scb1vllc00kxlx79-bash-5.2-p15/bin/bash
set -o errexit
set -o nounset
set -o pipefail

export PATH="/nix/store/vi5hdx18nnm04r3cw9gxw7ss6nis75mx-purs-0.15.11-2/bin:/nix/store/xjzs7dhaalbs39yw60jcl6vz9kn8xb9a-spago-0.93.9/bin:/nix/store/l43bdmxxlkrzwic3q24ik366qyqg3s1g-nodejs-18.16.1/bin:$PATH"

/nix/store/2q482xkf888hc17n38hz7c6ysd1hy9k4-script.kill/bin/script.kill &
wait

sleep 99999 | npx esbuild dev/main.js --outfile=dev/index.js --bundle --watch &
ESBUILD=$!

npx parcel serve -p $PORT --host $HOST dev/index.html &
PARCEL=$!

wait $ESBUILD
wait $PARCEL

# echo $ESBUILD
echo $PARCEL