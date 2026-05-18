#!/bin/bash

UNAME=$(uname -a)
echo $UNAME
if [[ $UNAME == *"Darwin"* ]]; then
  echo "It's Darmin!"
  OS="Darwin"
else
  echo "It's Linux"
  OS="Linux"
fi

show_help() {
  echo "Usage: ./run.sh [command]"
  echo ""
  echo "Commands:"
  echo "  to-mjs        Convert <name>.js to <name>.mjs for ./src/libs/_.js, @mobilabs/kzlog and @mobilabs/messenger"
  echo "  back-to-js    Restitute ./src/libs/_.js, @mobilabs/kzlog and @mobilabs/messenger to their initial state"   
  echo "  help          Show this help"
}

case "$1" in
  to-mjs)
    echo "Converting <name>.js to <name>.mjs in ./src/libs/_.js, @mobilabs/kzlog and @mobilabs/messenger ..."
    if [[ $OS == "Darwin" ]]; then
      sed -i '.bak' 's/mobilabs\/overslash\/_dist\/lib\/overslashobj/mobilabs\/overslash\/_dist\/lib\/overslashobj.mjs/' ./src/libs/_.js
      sed -i '.bak' 's/"main": "_dist\/lib\/kzlog.js"/"main": "_dist\/lib\/kzlog.mjs"/' ./node_modules/@mobilabs/kzlog/package.json
      sed -i '.bak' 's/"main": "_dist\/lib\/messenger.js"/"main": "_dist\/lib\/messenger.mjs"/' ./node_modules/@mobilabs/messenger/package.json
    else
      sed -i -e 's/mobilabs\/overslash\/_dist\/lib\/overslashobj/mobilabs\/overslash\/_dist\/lib\/overslashobj.mjs/' ./src/libs/_.js
      sed -i -e 's/"main": "_dist\/lib\/kzlog.js"/"main": "_dist\/lib\/kzlog.mjs"/' ./node_modules/@mobilabs/kzlog/package.json
      sed -i -e 's/"main": "_dist\/lib\/messenger.js"/"main": "_dist\/lib\/messenger.mjs"/' ./node_modules/@mobilabs/messenger/package.json
    fi
    echo "done"
    ;;

  back-to-js)
    echo "Returning _.js, @mobilabs/kzlog and @mobilabs/messenger in their initial state ..."
    if [[ $OS == "Darwin" ]]; then
      mv ./src/libs/_.js.bak ./src/libs/_.js
      mv ./node_modules/@mobilabs/kzlog/package.json.bak ./node_modules/@mobilabs/kzlog/package.json
      mv ./node_modules/@mobilabs/messenger/package.json.bak ./node_modules/@mobilabs/messenger/package.json
    fi
    echo "done"
    ;;

  help | *)
    show_help
    ;;
esac

# -- oOo --
