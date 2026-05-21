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
  echo "  to-mjs        Convert <name>.js to <name>.mjs for ./src/libs/_.js"
  echo "  back-to-js    Back to the original ./src/libs/_.js"
  echo "  help          Show this help"
}

case "$1" in
  to-mjs)
    echo "Converting <name>.js to <name>.mjs in ./src/libs/_.js, @mobilabs/kzlog and @mobilabs/messenger ..."
    if [[ $OS == "Darwin" ]]; then
      sed -i '.bak' 's/mobilabs\/overslash\/_dist\/lib\/overslashobj/mobilabs\/overslash\/_dist\/lib\/overslashobj.mjs/' ./src/libs/_.js
    else
      sed -i -e 's/mobilabs\/overslash\/_dist\/lib\/overslashobj/mobilabs\/overslash\/_dist\/lib\/overslashobj.mjs/' ./src/libs/_.js
    fi
    echo "done"
    ;;

  back-to-js)
    echo "Returning _.js in its initial state ..."
    if [[ $OS == "Darwin" ]]; then
      mv ./src/libs/_.js.bak ./src/libs/_.js
    fi
    echo "done"
    ;;

  help | *)
    show_help
    ;;
esac

# -- oOo --
