#!/usr/bin/env bash

mysqldump -u mkboard \
    --verbose \
    --no-data \
    mkboard | sed 's/ AUTO_INCREMENT=[0-9]*//g' > "$(dirname $0)/create-schema.sql"
