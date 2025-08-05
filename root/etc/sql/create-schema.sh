#!/usr/bin/env bash

mysql -v -u root -D mkboard < "$(dirname $0)/create-schema.sql"
