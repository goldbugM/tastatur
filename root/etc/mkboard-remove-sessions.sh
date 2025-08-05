#!/usr/bin/env bash

find /var/lib/mkboard/sessions -type f -mtime +14 -exec rm {} \;
