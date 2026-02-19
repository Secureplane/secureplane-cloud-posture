#!/bin/bash
set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "Usage: $0 <environment>"
  exit 1
fi

python src/main.py validate $ENVIRONMENT
python src/main.py plan $ENVIRONMENT
python src/main.py apply $ENVIRONMENT